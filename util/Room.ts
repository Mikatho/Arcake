import {IDronqStatement} from "../model/DronqStatementScheme";
import {Player} from "./Player";
import {evaluateAnswers} from "./EvaluationFactory";
import * as Datastore from "../data/Datastore";
import {NameConverter} from "./NameConverter";
import IRoom from "../_client/src/utility/interface/IRoom";
import Games from "../_client/src/utility/enums/Games";

export class Room implements IRoom {

    public readonly roomID: number;
    public inviteLink: string;
    public roomName: string;
    public gameMaster: Player;
    public statements: Array<IDronqStatement>;
    public players: Array<Player> = new Array<Player>();
    public clients: Array<Player> = new Array<Player>();
    public activeStatement: IDronqStatement;
    public roundIsActive = false;
    public playersVoted: Array<Player> = [];
    public activeGame: Games;
    public evaluatedResponse: Array<string>;
    public nameConverter: NameConverter;

    constructor(
        roomID: number,
        name: string,
        startingPlayer: Player,
        dronqStatements: Array<IDronqStatement>
    ) {
        this.activeGame = Games.Dronq
        this.roomID = roomID;
        this.roomName = name.toLowerCase();
        this.gameMaster = startingPlayer;
        this.addPlayer(startingPlayer)
        this.inviteLink = name.toLowerCase().replace(/\s/g, "") + roomID;
        this.statements = dronqStatements;
        this.nameConverter = new NameConverter();
        this.setActiveStatement(() => {
            console.log("New room initialised with db data");
        });
    }

    addResult(player: Player, result: string): void {
        this.playersVoted.push(player);
        player.answer = result;
    }

    evaluateResults(): Array<string> {
        this.roundIsActive = false;
        this.evaluatedResponse = evaluateAnswers(
            this.activeGame,
            this.players,
            this.playersVoted,
            this.activeStatement
        );
        return this.evaluatedResponse;
    }

    clearPlayersVoted(): void {
        this.playersVoted = [];
    }

    addPlayer(user: Player) : void {
        let playerExists = this.getPlayerByID(user.id)
        let clientExists = this.getPlayerByID(user.id)
        if (!playerExists && !clientExists) {
            this.players.push(user);
            this.clients.push(user);
        } else if (clientExists && !playerExists) {
            this.players.push(user);
        }
    }

    getPlayerByID(playerID : number): Player{
        return this.players.find(player => player.id === playerID)
    }

    getClientByID(clientID : number): Player{
        return this.clients.find(client => client.id === clientID)
    }

    getPlayerByName(playerName: string): Player {
        return this.players.find(player => player.name === playerName)
    }

    getClientByName(clientName: string): Player {
        return this.clients.find(client => client.name === clientName)
    }

    removePlayer(user: Player) {
        try {
            this.players.splice(this.players.indexOf(user, 0), 1);
        } catch (e) {
            console.log(e)
        }
    }

    removeClient(client: Player){
        try {
            this.players.splice(this.players.indexOf(client, 0), 1);
            this.clients.splice(this.clients.indexOf(client, 0), 1);
        } catch (e) {
            console.log(e)
        }
    }

    async setActiveStatement(callback) {
        if (this.statements.length === 0) {
            console.log('There are no statements left, loading new from db')
            Datastore.loadNewStatements(statements => {
                this.statements = statements;
                this.generateStatement(callback);
            })
        } else {
            this.generateStatement(callback);
        }
    }

    generateStatement(callback) {
        let randomID = Math.floor(Math.random() * this.statements.length);
        this.activeStatement = this.statements[randomID];
        this.statements.splice(randomID, 1);
        //TODO if noVote Statement, then alle auf voted
        this.clearPlayersVoted();
        this.roundIsActive = true;

        this.nameConverter.setCurrentUsers([...this.players]);

        this.activeStatement.statement = this.nameConverter.getConvertedStatement(this.activeStatement.statement);

        if (this.activeStatement.statement === "ErrorPlayer") {
            this.setActiveStatement(callback);
        } else callback();
    }
}

