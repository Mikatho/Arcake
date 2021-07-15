import {Player} from "../Player";
import {IDronqStatement} from "../../model/DronqStatementScheme";


export function evaluatePlayerVoting(allPlayers: Player[], playersVoted: Player[]): { player: Player, voters: Player[] }[] {
    let maxPlayervotes = 0;
    let playerVotes: { player: Player, voters: Player[] }[] = [];
    let mostVoted: { player: Player, voters: Player[] }[] = [];

    allPlayers.forEach((user) => {
        playerVotes.push({player: user, voters: []});
    })

    playerVotes.forEach((element) => {
        playersVoted.forEach((user) => {
            if (user.answer === element.player.name) {
                element.voters.push(user);
            }
        })
    });

    playerVotes.sort((a, b) => b.voters.length - a.voters.length);

    maxPlayervotes = playerVotes[0].voters.length;

    playerVotes.forEach((player) => {
        if (player.voters.length === maxPlayervotes) {
            mostVoted.push({ player: player.player, voters: player.voters });
        }
    })

    if (mostVoted.length === allPlayers.length) {
        return [];
    } else {
        return mostVoted;
    }
}

export function createResponse(statement: IDronqStatement, players: { player: Player, voters: Player[] }[]): string[] {
    let responseSnippets = ["Meiste Stimmen:"];

    if (players.length === 0) {
        return ["Unentschieden!"];
    }

    players.forEach((playerGuess) => {
        let votersNames: string[] = [];
        playerGuess.voters.forEach((voter) => {
            votersNames.push(voter.name);
        })
        responseSnippets.push(playerGuess.player.name + " wurde von " + votersNames.join(", ") + " gewählt.");
    });

    return responseSnippets;
}