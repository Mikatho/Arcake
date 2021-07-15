import {Player} from "../../../../util/Player";
import {IDronqStatement} from "../../../../model/DronqStatementScheme";
import Games from "../enums/Games";
import {NameConverter} from "../../../../util/NameConverter";

interface IRoom{
    readonly roomID: number,
    gameMaster: Player
    statements: Array<IDronqStatement>
    players: Array<Player>
    activeStatement: IDronqStatement
    roundIsActive: boolean,
    playersVoted: Array<Player>,
    activeGame: Games
    evaluatedResponse: Array<string>
    nameConverter: NameConverter
}

export default IRoom;