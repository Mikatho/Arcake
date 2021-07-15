import {Player} from "../Player";
import {IDronqStatement} from "../../model/DronqStatementScheme";


export function evaluateVoting(firstChoice: string, guesses: Player[]): Player[] {
    let votedFirst: Player[] = [];
    let votedSecond: Player[] = [];

    guesses.forEach((player) => {
        if (player.answer === firstChoice) votedFirst.push(player);
        else votedSecond.push(player);
    })

    if (votedFirst.length > votedSecond.length) return votedSecond;
    else if (votedSecond.length > firstChoice.length) return votedFirst;
    else return guesses;
}

export function createResponse(statement: IDronqStatement, players: Player[], roomPlayerCount: number): string[] {
    console.log(players);

    let responseSnippets: string[] = [];

    if (roomPlayerCount == 1) {
        return ["Trink!"];
    } else if (players.length === 0) {
        return ["Glückwunsch, einstimmig!"];
    } else if (players.length === roomPlayerCount) {
        return ["Unentschieden!"];
    }

    responseSnippets = ["Alle '" + players[0].answer + "'-Voter haben verloren:"];

    players.forEach((player) => {
        responseSnippets.push(player.name);
    });

    return responseSnippets;
}