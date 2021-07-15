import * as Datastore from '../data/Datastore'
import {Player} from '../util/Player'
import IRoomData from "../_client/src/utility/interface/IRoomData";

const inviteRouter = require('express').Router()

inviteRouter.post('/', (req, res) => {
    let body = req.body
    let roomName = body.roomName.toLowerCase();
    
    //Save player choices to create new player
    let {playerName, playerProperties} = body

    let room = Datastore.getRooms().find(n => n.roomName === roomName)
    if (room === undefined) {
        res.send({message: `Room ${roomName} does not exist`, status: 'failure'});
    } else {
        let newPlayer = room.clients.find(user => user.name === playerName);
        if (newPlayer === undefined) {
            let player = new Player(playerName, playerProperties);
            room.addPlayer(player);
            let roomData : IRoomData = {player: player, roomName: roomName, roomID: room.roomID}
            res.send({data: roomData})
        } else {
            res.send({message: `Name ${playerName} already exists in this room. Please choose another one.`, status: 'failure'});
        }
    }
})

module.exports = inviteRouter;