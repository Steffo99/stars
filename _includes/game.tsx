import {formatDateIso} from "../_utils/date.ts"
import {GameData, GameIdentifier} from "../_utils/game.ts"
import {Progress, progressToClassName, progressToIconDef, progressToTitle} from "../_utils/progress.ts"
import {ReviewInfo} from "../_components/ReviewInfo.tsx"


export const layout = "base.tsx"

export default function(data: GameData, helpers: Lume.Helpers) {
    const dateRow = (
        <ReviewInfo.MetadataRow
            className={"review-date"}
            label={"Last updated"}
        >
            {formatDateIso(data.date)}
        </ReviewInfo.MetadataRow>
    )

    const dateSeparator = (data.progress || data.hours_played) ? <hr/> : null

    const progressRow = data.progress ? (
        <ReviewInfo.MetadataRow
            className={`game-progress ${progressToClassName(data.progress)}`}
            label={"Progress"}
            icon={<i className={`fa-sharp fa-regular ${progressToIconDef(data.progress)} ${data.active ? "fa-beat-fade" : ""}`}/>}
        >
            <data value={data.progress}>
                {progressToTitle(data.progress)}
            </data>
            {data.active &&
                <>
                    ,&nbsp;
                    <span className={"fa-fade"} style={{animationDelay: '-0.5s'}}>now playing</span>
                </>
            }
        </ReviewInfo.MetadataRow>
    ) : null

    const hoursPlayedRow = data.hours_played ? (
        <ReviewInfo.MetadataRow
            className={`game-hoursplayed`}
            label={"Playtime"}
        >
            <data value={data.hours_played}>
                {data.hours_played}
            </data>
            &nbsp;
            h
        </ReviewInfo.MetadataRow>
    ) : null

    const playedSeparator = (data.purchased_on || data.started_on || data.beaten_on || data.completed_on || data.mastered_on) ? <hr/> : null

    const purchasedOnValue = formatDateIso(data.purchased_on)
    const purchasedOnRow = purchasedOnValue ? (
        <ReviewInfo.MetadataRow
            className={`game-purchasedon`}
            label={"Purchased on"}
            icon={<i className={`fa-sharp fa-regular ${progressToIconDef(Progress.New)}`}/>}
        >
            <time dateTime={purchasedOnValue}>
                {purchasedOnValue}
            </time>
        </ReviewInfo.MetadataRow>
    ) : null

    const startedOnValue = formatDateIso(data.started_on)
    const startedOnRow = startedOnValue ? (
        <ReviewInfo.MetadataRow
            className={`game-startedon`}
            label={"Started on"}
            icon={<i className={`fa-sharp fa-regular ${progressToIconDef(Progress.Started)}`}/>}
        >
            <time dateTime={startedOnValue}>
                {startedOnValue}
            </time>
        </ReviewInfo.MetadataRow>
    ) : null

    const beatenOnValue = formatDateIso(data.beaten_on)
    const beatenOnRow = beatenOnValue ? (
        <ReviewInfo.MetadataRow
            className={`game-beatenon`}
            label={"Beaten on"}
            icon={<i className={`fa-sharp fa-regular ${progressToIconDef(Progress.Beaten)}`}/>}
        >
            <time dateTime={beatenOnValue}>
                {beatenOnValue}
            </time>
        </ReviewInfo.MetadataRow>
    ) : null

    const completedOnValue = formatDateIso(data.completed_on)
    const completedOnRow = completedOnValue ? (
        <ReviewInfo.MetadataRow
            className={`game-completedon`}
            label={"Completed on"}
            icon={<i className={`fa-sharp fa-regular ${progressToIconDef(Progress.Completed)}`}/>}
        >
            <time dateTime={completedOnValue}>
                {completedOnValue}
            </time>
        </ReviewInfo.MetadataRow>
    ) : null

    const masteredOnValue = formatDateIso(data.mastered_on)
    const masteredOnRow = masteredOnValue ? (
        <ReviewInfo.MetadataRow
            className={`game-masteredon`}
            label={"Mastered on"}
            icon={<i className={`fa-sharp fa-regular ${progressToIconDef(Progress.Mastered)}`}/>}
        >
            <time dateTime={masteredOnValue}>
                {masteredOnValue}
            </time>
        </ReviewInfo.MetadataRow>
    ) : null

    const milestonesSeparator = ((data.identifiers?.length ?? 0) > 0) ? <hr/> : null

    const identifiersRows = data.identifiers?.map((identifier: GameIdentifier, index: number) => {
        switch(identifier.type) {
            case "steam":
                return (
                    <ReviewInfo.MetadataRow
                        key={index}
                        className={`game-identifier-steam`}
                        label={<span><i className={`fa-brands fa-steam`}/>&nbsp;Steam</span>}
                    >
                        <a href={`https://store.steampowered.com/app/${identifier.appid}/`}>
                            {identifier.name ?? identifier.appid}
                        </a>
                    </ReviewInfo.MetadataRow>
                )
        }
    })

    return (
        <main id={"game-main"}>
            <ReviewInfo
                name={data.name}
                rating={data.rating}
                metadata={<>
                    {dateRow}
                    {dateSeparator}
                    {progressRow}
                    {hoursPlayedRow}
                    {playedSeparator}
                    {purchasedOnRow}
                    {startedOnRow}
                    {beatenOnRow}
                    {completedOnRow}
                    {masteredOnRow}
                    {milestonesSeparator}
                    {identifiersRows}
                </>}
            >
                {data.children}
            </ReviewInfo>
        </main>
    )
}
