import React, {useState} from 'react';
import "../../../css/index.css";
import './createjoinRoom.css';
import {Link, useHistory, Switch, Route} from "react-router-dom";
import Axios from 'axios'
import {useCookies} from 'react-cookie';
import {SERVER_LINK} from '../../../utility/config'
import Toggle from "../../formInputs/toggle/Toggle";
import TextInput from "../../formInputs/textInput/TextInput";
import IPlayerProperties from "../../../utility/interface/IPlayerProperties";
import IRoomData from "../../../utility/interface/IRoomData";

function CreateGame() {
    const [playerProperties, setPlayerProperties] = useState<IPlayerProperties>({isDrinking: true, isSingle: true});
    const [playerName, setPlayerName] = useState("");
    const [playerHasName, setPlayerHasName] = useState(false);
    const [roomName, setRoomName] = useState("");
    const history = useHistory();
    const [cookie, setCookie, removeCookie] = useCookies(['playerID']);

    function toggleSingle() {
        setPlayerProperties({
            isSingle: !playerProperties.isSingle,
            isDrinking: playerProperties.isDrinking
        })
    }

    function toggleDrinking() {
        setPlayerProperties({
            isSingle: playerProperties.isSingle,
            isDrinking: !playerProperties.isDrinking
        })
    }

    function onUserNameChange(e: any) {
        setPlayerName(e.target.value)
        setPlayerHasName(e.target.value.length > 0)
    }

    function onRoomNameChange(e: any) {
        setRoomName(e.target.value);
    }

    async function postData(url: string, data: any) {
        console.log(data)
        Axios.post(url, data)
            .then(response => {
                if (response.data.message === 'success') {
                    console.log('received data at create:', response.data)
                    let RoomData : IRoomData = response.data.data;
                    setCookie('playerID', RoomData.player.id, {path: '/'});
                    setCookie('roomName', RoomData.roomName, {path: '/'});

                    history.push(`/game/${RoomData.player.id}/${RoomData.roomName}`);
                } else {
                    //TODO FRONTEND COOLE MESSAGE UNTER BUTTON ODER SO
                    console.log('Roomname already exists');
                    alert("Roomname already exists, please choose a different name.");
                }
            })
    }

    function createGame(e: any) {
        if (playerHasName) {
            e.preventDefault()
            let data = {
                playerName: playerName,
                roomName: roomName,
                playerProperties
            }
            postData(`${SERVER_LINK}/api/createRoom`, data)
        }
    }

    return (
        <div className="createjoinContainer">
            <div className="title">
                Create Game
            </div>

            <form className={"formContainer"}>
                <TextInput onChangeFunction={onUserNameChange}
                           label={"Name"}
                           id={"nameID"}
                           defaultValue={""}
                />
                <TextInput onChangeFunction={onRoomNameChange}
                           label={"Game Name"}
                           id={"roomNAME"}
                           defaultValue={""}
                />
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
                    //type="submit"
                        id="createRoom"
                        onClick={createGame}>
                    Create Game
                </button>

            </form>
        </div>
    );
}

export default CreateGame;
