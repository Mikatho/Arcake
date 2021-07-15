import {Player} from "../Player";
import {IDronqStatement} from "../../model/DronqStatementScheme";


export function getWinners(solution: string, guesses: Player[]): Player[] {
    let correctPlayers: Player[] = [];

    guesses.forEach((player) => {
        if (player.answer === solution) {
            correctPlayers.push(player);
        }
    })
    return correctPlayers;
}

export function createResponse(statement: IDronqStatement, allPlayers: Player[], winners: Player[]): string[] {
    let responseSnippets = ["Richtig: " + statement.solution];
    let correctPlayers: string[] =[];
    let wrongAnswers = statement.answers.filter((answer) => answer !== statement.solution);

    winners.forEach((player) => {
        correctPlayers.push(player.name);
    });

    responseSnippets.push(correctPlayers.join(", "));

    responseSnippets.push("Falsch:");

    wrongAnswers.forEach((answer) => {
        let wrongPlayers: string[] = [];
        allPlayers.forEach((player) => {
            if (player.answer === answer) {
                wrongPlayers.push(player.name);
            }
        })
        responseSnippets.push(answer + ": " + wrongPlayers.join(", "));
    })

    return responseSnippets;
}