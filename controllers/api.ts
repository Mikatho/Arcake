import * as Datastore from '../data/Datastore'
import {Player} from '../util/Player'
import IRoomData from "../_client/src/utility/interface/IRoomData";


const apiRouter = require('express').Router()

apiRouter.get('/', (request, response) => {
    response.send(`Welcome to the Arcake Api`)
})


apiRouter.post('/createRoom', (request, response) => {
    let body = request.body
    var playerName = body.playerName;
    var playerProperties = body.playerProperties;
    var roomName = body.roomName;

    if (Datastore.searchRoomByName(roomName) === undefined) {
        var player = new Player(playerName, playerProperties);
        let index = Datastore.addRoom(roomName, player, (index) => {
            let roomData : IRoomData = {roomID: index, player: player, roomName: Datastore.getRoomByID(index).roomName}
            response.send(
                {
                    message: 'success',
                    data: roomData,
                    // player: player,
                    // roomName: Datastore.getRoomByID(index).roomName,
                    // id: index
                })
        });
    } else {
        response.send({
            message: 'failure',
        })
    }
})

apiRouter.post('/getRoomByID', (req, res) => {
    
    const playerID = parseInt(req.body.playerID);
    const roomName = req.body.roomName;
    const room = Datastore.searchRoomByName(roomName);
    if (room === undefined) {
        res.send({
            status: 'failure' ,
            message:`The room ${roomName} does not exist`
        });
    } else {
        let isRegistered = room.clients.find(player => player.id === playerID)
        if (isRegistered !== undefined) {
            res.send({room, status: 'success'})
        } else {
            res.send({status: 'failure', message:`${playerID} is not registered in ${roomName}`})
        }
    }
})

apiRouter.post('/nextStatement', (req, res) => {

    let index: number = +req.body.roomID;
    let room = Datastore.getRoomByID(index);

    if (req.body.clickedPlayerID !== room.gameMaster.id) {
        res.send({message: "no permission", status:'failure'});
    } else {
        room.setActiveStatement(() => {
            res.send(room.activeStatement);
        })
    }
})

module.exports = apiRouter