import {Player} from "../Player";
import {IDronqStatement} from "../../model/DronqStatementScheme";


export function sortGuesses(solution: number, guesses: Player[]): Player[] {
    let playersSorted: Player[] = [];
    guesses.sort((a, b) => Math.abs(solution - parseInt(a.answer) - Math.abs(solution - parseInt(b.answer))));
    guesses.forEach((player) => {
        playersSorted.push(player);
    })
    return playersSorted;
}

export function findClosestGuess(needle: number, guesses: Player[]): Player[] {
    let closestGuesses: Player[] = [];
    let playersSorted = sortGuesses(needle, guesses);
    let difference = Math.abs(parseInt(playersSorted[0].answer) - needle);

    playersSorted.forEach((player:Player) => {
        if (Math.abs(parseInt(player.answer) - needle) === difference) {
            closestGuesses.push(player);
        }
    })
    return closestGuesses;
}

export function createResponse(statement: IDronqStatement, players: Player[]): string[] {
    let responseSnippets = ["Richtig: " + statement.solution, "Gewinner:"];

    let closestGuess = this.findClosestGuess(parseInt(statement.solution), players);

    closestGuess.forEach((player:Player) => {
        responseSnippets.push(player.name + " - " + player.answer);
    });

    responseSnippets.push("Verlierer:");

    players.forEach((player:Player) => {
        if (!closestGuess.includes(player)) {
            responseSnippets.push(player.name + " - " + player.answer);
        }
    })

    console.log(players);

    return responseSnippets;
}