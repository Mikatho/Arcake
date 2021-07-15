import React, {useEffect, useState} from 'react';
import "../../../css/index.css";
import {useHistory, useParams} from "react-router-dom";
import {DisplayWhen} from "../../utility/DisplayWhen";
import axios from 'axios'
import {useCookies} from 'react-cookie';
import {useBeforeunload} from 'react-beforeunload';
import {SERVER_LINK} from '../../../utility/config'
import Content from "../../gameComponents/content/Content";
import IGameInput from "../../../utility/interface/IGameInput";
import IClient from "../../../utility/interface/IClient";
import GameInput from "../../gameComponents/gameInput/GameInput";
import GameMasterInputs from "../../gameComponents/gameInput/gameMasterInput/GameMasterInputs";
import Sidebars from "../../sidebars/Sidebars";
import IPlayerProperties from "../../../utility/interface/IPlayerProperties";
import {Player} from "../../../../../util/Player";
import IRoom from "../../../utility/interface/IRoom";
import StatementType from "../../../utility/enums/StatementType";
import GameStatus from "../../../utility/enums/GameStatus";
import Games from "../../../utility/enums/Games";
import WSQuery from "../../../utility/enums/WSQuery";


const io = require('socket.io-client');

let socket: any;

type GameProps = {
    RoomID: string,
    UserName: string,
};

//TODO disable inputs if round is not active
//TODO disable inputs / next button onclick
//TODO enable inputs / next button only through socket.on
export const Game = ({RoomID, UserName}: GameProps) => {

    const [Statement, setStatement] = useState<IGameInput>({
        type: StatementType.NoInput,
        answers: [""],
        solution: "",
        statement: "",
        __v: 0,
        _id: "",
        cat_activity: 0,
        cat_drink: 0,
        cat_game: 0,
        cat_sex: 0,
        id: 0,
        rating: 0
    });

    const [roomName, setRoomName] = useState(useParams().roomName);
    const [playerName, setPlayerName] = useState(useParams().playerName)
    const [playerID, setPlayerID] = useState(useParams().playerID)

    const url = window.location.href;
    const domainURL = url.substring(0, url.indexOf("/game"));
    const [inviteLink, setInviteLink] = useState(`${domainURL}/joingame/${roomName}`);

    const [userList, setUserList] = useState(new Array<IClient>());
    const [isGameMaster, setGameMaster] = useState(false);
    const [gameMasterID, setGameMasterID] = useState('');

    const history = useHistory();
    const [cookie, setCookie, removeCookie] = useCookies(['playerID']);

    const [game, setGame] = useState(Games.Dronq);
    const [gameStatus, setGameStatus] = useState(GameStatus.startRound);

    const [results, setResults] = useState([""]);

    const [isPlayer, setIsPlayer] = useState(true);
    const [isOnline, setIsOnline] = useState(true);
    const [isStandardView, setStandardView] = useState(true);

    useBeforeunload(event => {
        socket.emit(`${roomName}/${WSQuery.disconnect}`, playerID)
    });

    function handleAnswerInput(answer: string) {
        console.log('Got answer: ', answer)
        socket.emit(`${roomName}/${WSQuery.addAnswer}`, answer)
    }

    //Wird 1x aufgerufen wenn das Component lädt
    useEffect(() => {
        fetchRoomData();
        checkForGamemaster();
        socket = io(SERVER_LINK, {query: {roomName, playerID}})

        //new User arrive and leave
        socket.on(`${roomName}/${WSQuery.sendUserData}`, (data: any) => {
            setUserList(data.players)
            checkForGamemaster();
            setGameMaster(data.gameMaster == playerID);
        });

        socket.on(`${roomName}/${WSQuery.startGame}`, (data: string) => {
            setGameStatus(GameStatus.activeRound);
        })

        socket.on(`${roomName}/${WSQuery.next}`, (data: IGameInput) => {
            setStatement(data);
            setGameStatus(GameStatus.activeRound);
        })

        socket.on(`${roomName}/${WSQuery.receiveResults}`, (result: Array<string>) => {
            setResults(result);
            setGameStatus(GameStatus.endRound);
        })

        socket.on(`${roomName}/${playerID}/${WSQuery.makeDisplay}`, () => {
            setIsPlayer(false);
            console.log("#########################")
        })
    }, []);


    async function fetchRoomData() {
        axios.post(`${SERVER_LINK}/api/getRoomByID`, {roomName, playerID}).then((response) => {
            console.log('Initialise room: ', response)
            if (response.data.status === 'failure') {
                deleteCookies();
                history.push('/');
            } else {
                let responseRoom : IRoom = response.data.room
                setGameMasterID(responseRoom.gameMaster.name);
                setUserList(responseRoom.players)
                setStatement(response.data.room.activeStatement);
                checkForGamemaster();
            }
        })
    }

    function addPlayer(playerName: string, playerProperties: IPlayerProperties) {
        //TODO SAVE LOCALLY AND IN SERVER
        console.log(playerName)
        console.log(playerProperties.isDrinking)
        console.log(playerProperties.isSingle)
    }

    function kickUser(player: IClient) {
        if (isGameMaster) {
            socket.emit(`${roomName}/${WSQuery.kick}`, player);
        }
    }

    function makeGamemaster(player: IClient) {
        if (isGameMaster) {
            socket.emit(`${roomName}/${WSQuery.makeGameMaster}`, player);
        }
    }

    function makeDisplay(player: IClient) {
        if (isGameMaster) {
            let bool = false;
            socket.emit(`${roomName}/${WSQuery.setIsPlayer}`, ({player, bool}));
        }
    }

    function deleteCookies() {
        history.push("/");
        removeCookie('playerID');
        removeCookie('roomName');
    }

    //check if current User is GameMaster -> if yes: Display the send button
    async function checkForGamemaster() {
        axios.post(`${SERVER_LINK}/api/getRoomByID`, {roomName, playerID}).then(response => {
            try {
                let responseRoom : IRoom = response.data.room
                setGameMaster(playerID == responseRoom.gameMaster.id)
            } catch (e){
                console.log(e)
            }
        })
    }

    function gameMasterOnClick() {
        switch (gameStatus) {
            case GameStatus.startRound:
                socket.emit(`${roomName}/${WSQuery.startGame}`, '')
                break;
            case GameStatus.activeRound:
                socket.emit(`${roomName}/${WSQuery.startEvaluation}`, '')
                break;
            case GameStatus.endRound:
                socket.emit(`${roomName}/${WSQuery.next}`, '');
                break;
        }
    }

    function changeGame(game: Games) {
        setGame(game);
        //TODO IMPLEMENT (WORKS ALREADY?)
    }

    useEffect(()=> {
        if (!isPlayer) {
            setStandardView(true);
        }
    }, [isPlayer])

    function toggleOwnIsPlayer(){
        setIsPlayer(!isPlayer);
        socket.emit(`${roomName}/${WSQuery.setOwnIsPlayer}`, {isPlayer});
    }

    function toggleIsOnline() {
        setIsOnline(!isOnline);
        //TODO IF OFFLINE, EVERYONE IS NOT PLAYER (-> DISPLAY)
        //TODO SEND OFFLINE PLAYERLIST TO SERVER
    }

    function toggleStandartView() {
        setStandardView(!isStandardView);
    }

    return (
        <div className="gameContent">

            <Content games={game}
                     gameStatus={gameStatus} results={results} statement={Statement.statement}
                     isStandartView={isStandardView} isPlayer={isPlayer}/>

            <GameInput handleAnswerInput={handleAnswerInput}
                       statement={Statement} players={userList}
                       gameStatus={gameStatus} isPlayer={isPlayer}
                       isGameMaster={isGameMaster} gameMasterOnClick={gameMasterOnClick}/>

            <Sidebars
                playersProps={
                    {
                        roomName: roomName,
                        inviteLink: inviteLink,
                        gameMaster: gameMasterID,
                        kickUser: kickUser,
                        makeDisplay: makeDisplay,
                        makeGamemaster: makeGamemaster,
                        addPlayer: addPlayer,
                        userList: userList,
                        isGameMaster: isGameMaster,
                    }}
                optionsProps={
                    {
                        game: game, changeGame: changeGame,
                        isOnline: isOnline, toggleIsOnline: toggleIsOnline,
                        isPlayer: isPlayer, toggleIsPlayer: toggleOwnIsPlayer,
                        isStandardView: isStandardView, toggleStandardView: toggleStandartView,
                        isGameMaster: isGameMaster,
                        leaveGame: deleteCookies,
                    }}
            />
        </div>

    );

}

export default Game;