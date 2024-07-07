import {GameTable} from "../_components/GameTable.tsx"
import { GameData } from "../_utils/game.ts";


export const layout = "base.tsx"
export const url = "/games.html"

export default function(data: Lume.Data, helpers: Lume.Helpers) {
    const intro_section = data.content ? (
        <section id={"list-games-section-intro"}>
            {data.children}
        </section>
    ) : null

    const games: GameData[] = data.search.pages("game")

    const games_section = (
        <section id={"list-games-section-games"}>
            <h2>
                Videogames list
                <small>
                    <a href={helpers.url("/games/feed.rss")}>
                        <i className={"fa-sharp fa-solid fa-rss"}/> Feed
                    </a>
                </small>
                <small>
                    <a href={helpers.url("/games/index.json")}>
                        <i className={"fa-sharp fa-solid fa-brackets-curly"}/> JSON
                    </a>
                </small>
            </h2>
            <div>
                <GameTable id={"list-games-table"} games={games} priority={"mixed"}/>
            </div>
        </section>
    )

    return (
        <main id={"list-games-main"}>
            {intro_section}
            {games_section}
            <script src={"/_static/scripting/sort.js"}/>
            <script src={"/_static/scripting/installSortOnLoad.js"}/>
        </main>
    )
}
