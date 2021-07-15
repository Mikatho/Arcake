import {Player} from './Player'
import {IDronqStatement} from '../model/DronqStatementScheme'
import * as MultipleChoice from './StatementTypes/MultipleChoice'
import * as MultChoiceVoting from './StatementTypes/MultChoiceVoting'
import * as PlayerVoting from './StatementTypes/PlayerVoting'
import * as TextInput from './StatementTypes/NumberInput'
import Games from "../_client/src/utility/enums/Games";

enum StatementType {
    NoInput = "0",
    ButtonInput = "1",
    PersonInput = "2",
    TextInput = "3"
}

export const evaluateAnswers = (game: Games, allPlayers: Player[], votedPlayers: Player[], statement: IDronqStatement): Array<string> => {
    switch (game) {
        case Games.Dronq:
            return evaluateDronqStatement(allPlayers, votedPlayers, statement);
        case Games.Intimacy:
            console.log('cumming soon 8===D ~~~ ( . Y . ) .......')
    }
}

const evaluateDronqStatement = (allPlayers: Player[], playersVoted: Player[], statement: IDronqStatement): Array<string> => {
    if (playersVoted.length === 0) {
        return [];
    }

    switch (statement.type) {
        case StatementType.NoInput:
            // nichts zum auswerten. noob
            return [];
        case StatementType.ButtonInput:
            // Multiple Choice Statements

            // 2 Answers == Voting
            if (statement.answers.length === 2) {
                let sortedPlayers = MultChoiceVoting.evaluateVoting(statement.answers[0], playersVoted);
                return MultChoiceVoting.createResponse(statement, sortedPlayers, allPlayers.length);

                // 4 Answers == Multiple Choice // statement.answers.length === 4
            } else {
                let winner = MultipleChoice.getWinners(statement.solution, playersVoted);
                return MultipleChoice.createResponse(statement, playersVoted, winner);
            }
        case StatementType.PersonInput:
            // Player Voting
            let mostVoted = PlayerVoting.evaluatePlayerVoting(allPlayers, playersVoted);
            return PlayerVoting.createResponse(statement, mostVoted);
        case StatementType.TextInput:
            // Text Input
            let sortedPlayers = TextInput.sortGuesses(parseInt(statement.solution), playersVoted);
            return TextInput.createResponse(statement, sortedPlayers);
    }
}
