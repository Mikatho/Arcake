import { Room } from "../util/Room";
import { Player } from "../util/Player";
import * as mongoose from 'mongoose';
import {DronqStatementScheme, DronqStatement, IDronqStatement} from '../model/DronqStatementScheme'

mongoose.connect(`mongodb+srv://admin:admin@arcake0.okpo4.mongodb.net/Arcake?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology: true })

export const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Database');
});

//Save all rooms in an Array
let rooms: Array<Room> = [];

/**
 * 
 * @param name The name of the Room
 * @param hostingPlayer a Player that is the host of the room (gamemaster)
 * @param callback a callback with the new Room ID
 */
export async function addRoom(name: string, hostingPlayer: Player, callback) {
  let statements = await DronqStatement.find({});
  let newRoomID =
      rooms.length === 0 ? 0 : rooms[rooms.length - 1].roomID + 1;
  let newRoom = new Room(newRoomID, name, hostingPlayer, [...statements]);
  rooms.push(newRoom);
  callback(newRoomID);
}

export async function loadNewStatements(callback){
  let statements = await DronqStatement.find({})
  callback(statements);

}

export function getRooms(): Array<Room> {
  return rooms;
}

export function getRoomByID(n: number): Room {
  return rooms.find((room) => room.roomID === n);
}

export function searchRoomByName(name: string): Room {
  return rooms.find((room) => room.roomName === name.toLowerCase());
}
