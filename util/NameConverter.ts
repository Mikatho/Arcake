import {Player} from "./Player";

export class NameConverter {

    private formattedStatement: string;
    private currentStatement: string;
    private freeUsers: Player[];
    private statementPieces: string[];

    constructor() {
    }

    setCurrentUsers(current_users: Player[]){
        this.freeUsers = current_users;
    }

    getConvertedStatement(current_statement: string) {
        this.currentStatement = current_statement;
        this.formattedStatement = "";
        this.statementPieces = this.currentStatement.split("#");

        for (let piece of this.statementPieces) {
            if (piece.search("player") > -1) {
                let mustBeMale = false;
                let mustBeFemale = false;
                let mustBeSingle = false;
                let mustBeSober = false;
                let mustBeDrunk = false;

                if (piece.search("Male") > -1) {
                    mustBeMale = false;
                }
                if (piece.search("Female") > -1) {
                    mustBeFemale = false;
                }
                if (piece.search("Single") > -1) {
                    mustBeSingle = true;
                }
                if (piece.search("Sober") > -1) {
                    mustBeSober = true;
                }
                if (piece.search("Drunk") > -1) {
                    mustBeDrunk = true;
                }

                // Getting all Users fitting the Statement-pieces keywords
                let availablePlayers: Array<Player> = [];
                this.freeUsers.forEach((availablePlayer) => {
                    let isAvailable = true;

                    if (mustBeSingle) {
                        if (!availablePlayer.properties.isSingle) isAvailable = false;
                    }

                    if (mustBeDrunk) {
                        if (!availablePlayer.properties.isDrinking) isAvailable = false;
                    }

                    if (mustBeSober) {
                        if (availablePlayer.properties.isDrinking) isAvailable = false;
                    }

                    if (isAvailable) availablePlayers.push(availablePlayer);
                });

                // replacing piece with random Player username
                // returning Error Player when no Player is available
                if (availablePlayers.length === 0) {
                    return "ErrorPlayer";
                } else {
                    let random_index = Math.floor(Math.random() * availablePlayers.length);
                    let random_player = availablePlayers[random_index];
                    piece = "" + random_player.name + "";
                    delete this.freeUsers[random_index];
                }
            }
            this.formattedStatement += piece + "";
        }
        return this.formattedStatement;
    }
}