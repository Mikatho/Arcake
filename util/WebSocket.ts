import * as DataStore from '../data/Datastore';
import StatementType from "../_client/src/utility/enums/StatementType";
import {Player} from "./Player";
import {Room} from "./Room";
import IClient from "../_client/src/utility/interface/IClient";
import WSQuery from "../_client/src/utility/enums/WSQuery";
import {searchRoomByName} from "../data/Datastore";
import {isDeepStrictEqual} from "util";

/*
TODO
Routes von functions trennen.. 
Beispiel:

socket.on(`${roomName}/next`, (msg) => {
      room.setActiveStatement()
      room.getActivePlayers().forEach(player => player.setStatusVoted(false))
      io.emit(`${roomName}/next`, room.getActiveStatement());
      io.emit(`${roomName}/user`, {players: room.getActivePlayers(), gameMaster: room.getGamemaster().getId});
});

sollte lieber so aufgedröselt werden: 

socket.on(`${roomName}/next`, (msg) => {
  handleSocketNext(socket, msg, room);
});

function handleSocketNext(socket, msg) {
  room.setActiveStatement()
  room.getActivePlayers().forEach(player => player.setStatusVoted(false))
  io.emit(`${roomName}/next`, room.getActiveStatement());
  io.emit(`${roomName}/user`, {players: room.getActivePlayers(), gameMaster: room.getGamemaster().getId});
}
*/

/**
 * This function initialises a Websocket connection with the given functions
 * @param io The io connection that the functions should be added to
 */
export const initialiseWSFunctions = (io: any) => {

    io.on("connection", (socket) => {
        console.log('Client connected!')
        //NAME WIRD VOM COMPONENT GAME ALS QUERY ÜBERGEBEN
        let roomName = socket.handshake.query.roomName;
        let room = DataStore.searchRoomByName(roomName);

        //BEI CONNECTION WIRD DIE AKTUELLE LISTE DER AKTIVEN SPIELER AN JEDEN
        //TEILNEHMER GESENDET
        if (room !== undefined) {
            let connectingPlayer = room.getPlayerByID(parseInt(socket.handshake.query.playerID));
            if (connectingPlayer !== undefined) connectingPlayer.status.isIdle = false;
            sendUserInfo(room, roomName)
        }

        //Das Spiel im Raum starten
        socket.on(`${roomName}/${WSQuery.startGame}`, (msg) => {
            if (isGameMaster(socket, room)) {
                io.emit(`${roomName}/${WSQuery.startGame}`, '')
            }
        })

        //Nächste frage wird geladen und emittet
        socket.on(`${roomName}/${WSQuery.next}`, (msg) => {
            if (isGameMaster(socket, room)) {
                sendNextRound(room, roomName);
            }
        });

        //Wenn ein User eine Antwort übermittelt wird diese verbindung aufgerufen
        socket.on(`${roomName}/${WSQuery.addAnswer}`, (msg) => {
            //if (playerIsInRoom(socket, room)) {
            try {
                let player = room.getPlayerByID(parseInt(socket.handshake.query.playerID));
                console.log(`${roomName} - ${player.name} voted: ${msg}`)
                room.addResult(player, msg);
                player.status.hasVoted = true
                sendUserInfo(room, roomName)
                canEvaluate(room, roomName);
            } catch (e) {
                console.log('Error on submitting Answer:', e)
            }
            // }
        })

        //Startet die evaluation in einem Raum
        socket.on(`${roomName}/${WSQuery.startEvaluation}`, (msg) => {
            if (isGameMaster(socket, room)) {
                if (canSkipResults(room)) {
                    sendNextRound(room, roomName);
                } else {
                    evaluateAndSendResults(room, roomName)
                }
            }
        })

        //Spieler isPlayer toggle
        socket.on(`${roomName}/${WSQuery.setIsPlayer}`, (data: { player: IClient, isPlayer: boolean }) => {
            if (isGameMaster(socket, room)) {
                let player = room.getPlayerByID(data.player.id)
                setIsPlayer(roomName, player, data.isPlayer)
                sendUserInfo(room, roomName)
            }
        })

        //eigenen Spieler isPlayer toggle
        socket.on(`${roomName}/${WSQuery.setOwnIsPlayer}`, (data: { isPlayer: boolean }) => {
            if (isGameMaster(socket, room)) {
                setIsPlayer(roomName, room.getPlayerByID(parseInt(socket.handshake.query.playerID)), data.isPlayer)
                sendUserInfo(room, roomName)
            }
        })

        //Spieler kicken
        socket.on(`${roomName}/${WSQuery.kick}`, (playerData: IClient) => {
            if (isGameMaster(socket, room)) {
                removeClient(room.getPlayerByID(playerData.id), room)
                sendUserInfo(room, roomName)
            }
        })

        //Spieler zu Gamemaster machen
        socket.on(`${roomName}/${WSQuery.makeGameMaster}`, (playerData: IClient) => {
            if (isGameMaster(socket, room)) {
                makeGameMaster(room.getPlayerByID(playerData.id), room)
                sendUserInfo(room, roomName)
            }
        })

        //Wenn jemand disconnected dann werden alle user in einem raum benachrichtigt
        socket.on(`${roomName}/${WSQuery.disconnect}`, (playerID) => {
            try {
                let disconnectedPlayer = room.getPlayerByID(parseInt(playerID))
                if (disconnectedPlayer !== undefined) {
                    disconnectedPlayer.status.isIdle = true
                }
                sendUserInfo(room, roomName)
            } catch (e) {
                console.log('Failed at disconnecting player: ', e);
            }
        });
    });

    function playerIsInRoom(socket: any, room: Room) {
        return room.getPlayerByID(parseInt(socket.handshake.query.playerID))
    }

    function isGameMaster(socket: any, room: Room) {
        let player = room.getPlayerByID(parseInt(socket.handshake.query.playerID));
        return room.gameMaster.id == player.id && room.gameMaster.name == player.name
    }

    function didAllVote(room: Room): boolean {
        let players = room.players, allVoted = true;
        for (const player of players) {
            if (player.status.isPlayer) {
                if (!player.status.hasVoted) {
                    allVoted = false
                }
            }
        }
        return allVoted
    }

    function canEvaluate(room: Room, roomName: string): void {
        if (didAllVote(room)) {
            evaluateAndSendResults(room, roomName)
        }
    }

    function canSkipResults(room: Room): boolean {
        return room.activeStatement.type == StatementType.NoInput || room.playersVoted.length == 0;
    }

    function setIsPlayer(roomName:string, player: Player, isPlayer: boolean): void {
        if(isPlayer){
            io.emit(`${roomName}/${player.id}/${WSQuery.makeDisplay}`, "");
        }
        player.status.isPlayer = isPlayer

    }

    function removeClient(player: Player, room: Room): void {
        console.log('This player was kicked', player)
        room.removeClient(player);
    }

    function makeGameMaster(player: Player, room: Room): void {
        console.log('This player is new Gamemaster', player)
        room.gameMaster = player
    }

    function sendUserInfo(room: Room, roomName: string): void {
        let privatePlayers = room.players
        privatePlayers.forEach(player => {
            delete player.answer
        })

        io.emit(`${roomName}/${WSQuery.sendUserData}`, {
            players: privatePlayers,
            gameMaster: room.gameMaster.id
        });
    }

    function sendNextRound(room: Room, roomName: string): void {
        room.setActiveStatement(() => {
            room.players.forEach(player => player.status.hasVoted = false)
            io.emit(`${roomName}/${WSQuery.next}`, room.activeStatement);
            sendUserInfo(room, roomName)
        })
    }

    function evaluateAndSendResults(room: Room, roomName: string): void {
        console.log(room.evaluateResults());
        io.emit(`${roomName}/${WSQuery.receiveResults}`, room.evaluateResults());
        sendUserInfo(room, roomName)
    }
}
