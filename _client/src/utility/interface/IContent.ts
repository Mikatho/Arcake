import GameStatus from "../enums/GameStatus";
import Games from "../enums/Games";

interface IContent {
    gameStatus: GameStatus,
    results: Array<string>,
    statement: string,
    isStandartView: boolean,
    isPlayer: boolean,
    games:Games
}

export default IContent;
