import {GameData} from "../_utils/game.ts"
import {GameRow, GameRowColumnKind, gameRowColumnKindDefault, GameRowColumnPriority} from "./GameRow.tsx"


export type GameTableProps = {
    id?: string,
    games: GameData[],
    columns?: GameRowColumnKind[]
    priority?: GameRowColumnPriority
}


export function GameTable({id, games, columns = gameRowColumnKindDefault, priority}: GameTableProps) {
    const colElements = columns.map((column, index) => {
        switch(column) {
            case "rating": return (
                <col key={index} className={`review-rating`}/>
            )
            case "progress": return (
                <col key={index} className={`game-progress`}/>
            )
            case "name": return (
                <col key={index} className={`review-name`}/>
            )
            case "hascontent": return (
                <col key={index} className={`review-hascontent`}/>
            )
            case "date": return (
                <col key={index} className={`review-date`}/>
            )
            case "hoursplayed": return (
                <col key={index} className={`review-hoursplayed`}/>
            )
        }
    })

    const thElements = columns.map((column, index) => {
        switch(column) {
            case "rating": return (
                <th key={index} scope={"col"} className={`review-rating`}>
                    <abbr title={"The rating of the game, from 1 to 100."}>
                        <i className={`fa-sharp fa-solid fa-thumbs-up`}/>
                    </abbr>
                </th>
            )
            case "progress": return (
                <th key={index} scope={"col"} className={`game-progress`}>
                    <abbr title={"The progress that has been made in the game."}>
                        <i className={`fa-sharp fa-solid fa-bars-progress`}/>
                    </abbr>
                </th>
            )
            case "name": return (
                <th key={index} scope={"col"} className={`review-name`}>
                    <abbr title={"The title of the game."}>
                        Title
                    </abbr>
                </th>
            )
            case "namesort": return (
                <th key={index} scope={"col"} className={`review-namesort`} hidden={true}>
                    <abbr title={"The title to sort the game as."}>
                        Sort by
                    </abbr>
                </th>
            )
            case "hascontent":
                return (
                    <th key={index} scope={"col"} className={`review-hascontent`}>
                        <abbr title={"Whether the review has textual content, or just metadata."}>
                        <i className={`fa-sharp fa-regular fa-bars-sort`}/>
                    </abbr>
                </th>
            )
            case "date": return (
                <th key={index} scope={"col"} className={`review-date`}>
                    <abbr title={"The date of the last update of the review."}>
                        Date
                    </abbr>
                </th>
            )
            case "hoursplayed": return (
                <th key={index} scope={"col"} className={`game-hoursplayed`}>
                    <abbr title={"How many hours the game has been played for."}>
                        Playtime
                    </abbr>
                </th>
            )

        }
    })

    const trTdElements = games.map((game: GameData) => (
        <GameRow key={game.url} game={game} columns={columns} priority={priority}/>
    ))

    return (
        <table id={id}>
            <colgroup>
                {colElements}
            </colgroup>
            <thead>
                <tr>
                    {thElements}
                </tr>
            </thead>
            <tbody>
                {trTdElements}
            </tbody>
        </table>
    )
}