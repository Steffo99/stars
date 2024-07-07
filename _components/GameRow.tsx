import {formatDateIso} from "../_utils/date.ts"
import {GameData} from "../_utils/game.ts"
import {Progress, progressToClassName, progressToIconDef, progressToTitle} from "../_utils/progress.ts"
import {ratingToClassName} from "../_utils/rating.ts"


export type GameRowColumnKind = "rating" | "progress" | "name" | "namesort" | "hascontent" | "date" | "hoursplayed"
export type GameRowColumnPriority = undefined | "rating" | "progress" | "mixed"

export const gameRowColumnKindDefault: GameRowColumnKind[] = ["rating", "name", "namesort", "hascontent", "date", "progress", "hoursplayed"]


export type GameRowProps = {
    game: GameData,
    columns?: GameRowColumnKind[]
    priority?: GameRowColumnPriority
}


export function GameRow({game, columns = gameRowColumnKindDefault, priority}: GameRowProps) {
    const activeClass: string = game.active ? "review-active" : ""
    const activeClassFa: string = game.active ? "fa-beat-fade" : ""

    const ratingText: string = game.rating ? `${game.rating}` : ""

    const ratingClass: string = ratingToClassName(game.rating)

    const progressClass: string = progressToClassName(game.progress)
    const progressIcon: string = progressToIconDef(game.progress)
    const progressTitle: string = progressToTitle(game.progress)

    const priorityClass: string = priority ? `priority-${priority}` : ""

    const columnsElements = columns.map((kind, index) => {
        switch(kind) {
            case "rating": {
                return (
                    <td key={index} className={`review-rating ${ratingClass}`}>
                        <data value={ratingText}>
                            {ratingText}
                        </data>
                    </td>
                )
            }
            case "progress": {
                return (
                    <td key={index} className={`game-progress ${progressClass}`}>
                        <data value={game.progress ?? Progress.Unset} title={progressTitle}>
                            {progressIcon && <i className={`fa-sharp fa-regular ${progressIcon} ${activeClassFa}`}></i>}
                        </data>
                    </td>
                )
            }
            case "name": {
                return (
                    <td key={index} className={`review-name`}>
                        <a href={game.url}>
                            <data value={game.name ?? ""}>
                                {game.name}
                            </data>
                        </a>
                    </td>
                )
            }
            case "namesort": {
                return (
                    <td key={index} className={`review-namesort`} hidden={true}>
                        <data value={game.name ?? ""}/>
                    </td>
                )
            }
            case "hascontent": {
                return (
                    <td key={index} className={`review-hascontent`}>
                        <data value={game.content ? "true" : "false"}>
                            {game.content && <i className={"fa-sharp fa-regular fa-bars-sort"}/>}
                        </data>
                    </td>
                )
            }
            case "date": {
                const date = formatDateIso(game.date)
                return (
                    <td key={index} className={`review-date`}>
                        <time dateTime={date ?? ""}>
                            {date}
                        </time>
                    </td>
                )
            }
            case "hoursplayed": {
                return (
                    <td key={index} className={`game-hoursplayed`}>
                        <data value={game.hours_played ?? ""}>
                            {(game.hours_played ?? 0) > 0 ? `${game.hours_played} h` : ""}
                        </data>
                    </td>
                )
            }
        }
    })

    return (
        <tr className={`game ${activeClass} ${ratingClass} ${progressClass} ${priorityClass}`}>
            {columnsElements}
        </tr>
    )
}