import React, {useEffect, useState} from 'react';
import "../../../css/index.css";
import './createjoinRoom.css';
import {Link, useHistory} from "react-router-dom";
import Axios from 'axios'
import {DisplayWhen} from "../../utility/DisplayWhen";
import {useParams} from "react-router-dom";
import {useCookies} from 'react-cookie';
import {SERVER_LINK} from '../../../utility/config'
import TextInput from "../../formInputs/textInput/TextInput";
import Toggle from "../../formInputs/toggle/Toggle";
import IPlayerProperties from "../../../utility/interface/IPlayerProperties";
import IRoomData from "../../../utility/interface/IRoomData";


function JoinGame() {
    const [playerProperties, setPlayerProperties] = useState<IPlayerProperties>({isSingle: true, isDrinking: true})
    const [playerName, setPlayerName] = useState('');
    const [roomName, setRoomName] = useState(useParams().roomName);
    const history = useHistory();
    const [isInvited, setInvited] = useState(false);
    const [playerHasName, setPlayerHasName] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['playerID']);

    useEffect(() => {
        toggleInvited();
        if (cookie.playerID && cookie.roomName) {
            if(!isInvited){
                setRoomName(cookie.roomName)
                //history.push(`/game/${cookie.playerID}/${cookie.roomName}`);
            }
        }
    })

    function toggleSingle() {
        setPlayerProperties({
            isDrinking: playerProperties.isDrinking,
            isSingle: !playerProperties.isSingle
        })
    }

    function toggleDrinking() {
        setPlayerProperties({
            isDrinking: !playerProperties.isDrinking,
            isSingle: playerProperties.isSingle
        })}

    function onChangePlayerName(e: any) {
        setPlayerName(e.target.value)
        setPlayerHasName(e.target.value.length > 0)
    }

    function onChangeRoomName(e: any) {
        setRoomName(e.target.value)
    }

    function connectToRoom(e: any) {
        if (playerHasName) {
            e.preventDefault()
            let url = `${SERVER_LINK}/invite/`
            let data = {
                playerName,
                roomName,
                playerProperties
            }
            Axios.post(url, data).then(response => {
                if (response.data.status === 'failure') {
                    console.log(response)
                    alert(response.data.message);
                    //TODO FRONTEND KRAM MACHEN WENN ES RAUM NICHT GIBT
                    //FAIL MESSAGE IN response.data.message
                } else {
                    //SET COOKIE mit player id and room name
                    console.log(response)
                    let roomData : IRoomData = response.data.data;
                    setCookie('playerID', roomData.player.id, {path: '/'});
                    setCookie('roomName', roomData.roomName, {path: '/'});
                    history.push(`/game/${roomData.player.id}/${roomData.roomName}`);
                }
            })
        }
    }

    function toggleInvited() {
        if (isInvited != undefined) {
            setInvited(true);
        }
    }

    return (
        <div className="createjoinContainer">
            <div className="title">
                Join Game
            </div>

            <form className={"formContainer"}>
                <TextInput onChangeFunction={onChangePlayerName} label={"Name"} id={"nameID"} defaultValue={""}/>
                <DisplayWhen visible={!isInvited}>
                    <TextInput onChangeFunction={onChangeRoomName} label={"Game Name"} id={"roomID"} defaultValue={""}/>
                </DisplayWhen>
                <DisplayWhen visible={isInvited}>
                    <TextInput onChangeFunction={onChangeRoomName} label={"Game Name"} id={"roomID"}
                               defaultValue={roomName}/>
                </DisplayWhen>

                Are you single?
                <div className={"flexRow"} onClick={toggleSingle}>
                    No
                    <Toggle toggleBoolean={playerProperties.isSingle} toggleFunction={toggleSingle}/>
                    Yes
                </div>

                Do you drink alcohol?
                <div className={"flexRow"} onClick={toggleDrinking}>
                    No
                    <Toggle toggleBoolean={playerProperties.isDrinking} toggleFunction={toggleDrinking}/>
                    Yes
                </div>

                <br/>

                <button className="buttonStyleBasic CreateBtn"
                        id="joinRoom"
                        onClick={connectToRoom}>
                    Join Game
                </button>

            </form>
        </div>

    );
}

export default JoinGame;
