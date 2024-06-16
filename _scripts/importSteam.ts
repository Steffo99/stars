import { loadSync as loadEnv } from "dotenv/mod.ts";
import site from "../_config.ts"
import {formatDateIso} from "../_utils/date.ts"
import {GameData, GameIdentifier} from "../_utils/game.ts"
import {stringifyYaml} from "lume/cms/deps/std.ts"

/* This is arguably one of the worst scripts I've ever written. */

type SteamGame = {
    appid: number,
    name: string,
    playtime_forever: number,
    img_icon_url?: string,
    has_community_visible_stats: boolean,
    playtime_windows_forever: number,
    playtime_mac_forever: number,
    playtime_linux_forever: number,
    playtime_deck_forever: number,
    rtime_last_played: number,
    sort_as: string,
    capsule_filename?: string,
    has_workshop: boolean,
    has_market: boolean,
    has_dlc: boolean,
    content_descriptorids?: number[],
    playtime_disconnected: number
}

const env = loadEnv()

const apiKey = env["STEAM_API_KEY"]
const steamId = env["STEAM_ID"]

console.debug("Creating reviewed games indexes...")

const appIdToPage: {[appId: string]: GameData | null} = {}
const filenameToAppId: {[filename: string]: string | null} = {}

for(const _page of site.search.pages("game")) {
    const page = _page as GameData
    const file: string = page.sourcePath
    const identifiers: GameIdentifier[] = page.data.identifiers.filter((i: GameIdentifier) => i.platform === "steam")

    let nullify: boolean = false
    for(const identifier of identifiers) {
        const appId = identifier.appid
        if(appIdToPage[appId] !== undefined) {
            console.warn(`AppID ${appId} from ${file} is already set at ${appIdToPage[appId]}, ignoring it.`)
            nullify = true
        }
        if(filenameToAppId[file] !== undefined) {
            console.warn(`File ${file} is already set with ${appId} at ${filenameToAppId[file]}, ignoring it.`)
            nullify = true
        }
    }
    for(const identifier of identifiers) {
        const appId = identifier.appid
        appIdToPage[appId] = nullify ? null : page
        filenameToAppId[file] = nullify ? null : appId
    }
}

console.debug("Fetching list of owned games via IPlayerService/GetOwnedGames/v1...")
const gamesResponse = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&include_extended_appinfo=true&include_played_free_games=true`)
const gamesData = await gamesResponse.json()
const games: SteamGame[] = gamesData["response"]["games"]
console.debug(`Detected ${games.length} games.`)

for(const game of games) {
    const appId = `${game.appid}`
    const page = appIdToPage[appId]
    let fullName = page?.page.sourcePath
    if(page === null) {
        continue
    }
    else if(page === undefined) {
        const cleanName = game.name
                              .toLocaleLowerCase()
                              .replaceAll(/[^a-z0-9]/g, '-')
                              .replaceAll(/-{2,}/g, '-')
        fullName = `games/${cleanName}.md`
        try {
            await Deno.lstat(fullName)
            console.warn(`File ${fullName} already exists, but is not identified by ${appId}, skipping...`)
            continue
        } catch(e) {
            console.info(`Importing new game: ${fullName}`)
            await Deno.create(fullName)
        }
    }

    const contents = {
        name: page?.name ?? game?.name,
        name_sort: page?.name_sort ?? game?.sort_as,
        rating: page?.rating,
        content: page?.content,
        active: page?.active,
        progress: page?.progress,
        hours_played: Math.max(page?.hours_played ?? 0, Math.round((game?.playtime_forever ?? 0) / 60)),
        purchased_on: page?.purchased_on,
        started_on: page?.started_on,
        beaten_on: page?.beaten_on,
        completed_on: page?.completed_on,
        mastered_on: page?.mastered_on,
        identifiers: [
            ...(page?.identifiers?.filter(i => i.platform !== "steam") ?? []),
            {
                platform: "steam",
                appid: appId,
                name: game.name,
                synced_on: formatDateIso(new Date())
            }
        ],
    }

    Object.entries(contents).forEach(([key, value]) => {
        if(value === undefined) {
            delete contents[key]
        }
    })



    const fsfile = await Deno.open(fullName!, {read: true, write: true})
    const encoder = new TextEncoder();
    const writer = fsfile.writable.getWriter()
    await writer.write(
        encoder.encode(`---\n${stringifyYaml(contents)}\n---\n`)
    )
    fsfile.close()
}
