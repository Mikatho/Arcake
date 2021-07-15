import express = require("express");
import * as WebSocket from './util/WebSocket';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path  = require('path');

const app: express.Application = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT: string = process.env.PORT || `3001`
const api = require('./controllers/api');
const inviteRouter = require('./controllers/Invite');

const wakeUpDyno = require("./util/wakeUpDyno.js");
const DYNO_URL = "https://www.arcake.app";

require('dotenv').config({path: '.env'});

/*
Websocket in seperater Datei damit es übersichtlich bleibt
*/
WebSocket.initialiseWSFunctions(io);

/*
Tools die der Server nutzen soll
*/
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

/*
Routen die in einzelnen Dateien definiert werden
Reihenfolge ist wichtig
*/
app.use('/api/', api);
app.use('/invite/', inviteRouter);
app.use(express.static('build'));
//Falls route nicht vorhanden ist schaut er in react nach dieser route:
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

//Server starten
server.listen(PORT, function () {
    console.log(`App is listening at ${PORT}`);
    wakeUpDyno(DYNO_URL);
});






