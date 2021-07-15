import React, {Component, useState} from "react";
import QRcode from "qrcode.react";
import {DisplayWhen} from "../../utility/DisplayWhen"
import InviteLink from "../../snippets/inviteLink/InviteLink";
import './playersSidebar.css';
import "bootstrap/dist/css/bootstrap.css";
import IconCheckmark from "../../icons/iconCheckmark/IconCheckmark";
import IconQuestionmark from "../../icons/iconQuestionmark/IconQuestionmark";
import IconStop from "../../icons/iconStop/IconStop";
import IPlayerSidebar from "../../../utility/interface/IPlayerSidebar";
import Userlist from "../../snippets/userList/Userlist";
import {Simulate} from "react-dom/test-utils";
import Button from "@material-ui/core/Button";
import AddPlayerForm from "./addPlayerForm/AddPlayerForm";

type playersProps = {
    playersProps:IPlayerSidebar
}

export const PlayersSidebar = ({playersProps}: playersProps) => {
    const {userList, kickUser, gameMaster, inviteLink, roomName, isGameMaster, addPlayer} = playersProps;
    const [qrCodeClicked, setQrCodeClicked] = useState(false);
    const [addPlayerClicked, setAddPlayerClicked] = useState(false);


    return (
        <div className="invSidebar ui sidebar overlay right inverted menu visible"
             onClick={() => {
                 if (qrCodeClicked) {
                     setQrCodeClicked(false);
                 }
             }
             }>
            <div className={"sidebarContainer"}>

                <DisplayWhen visible={!qrCodeClicked && !addPlayerClicked}>
                    <div className="inviteContainer">
                        <div className={"flexColumn"}>
                            <div className="roomName">
                                Room Name : {roomName}
                            </div>
                            <div className="InviteLink">
                                <InviteLink inviteLink={inviteLink}/>
                            </div>
                        </div>
                        <div className={"qrcodeBackground"} onClick={() => setQrCodeClicked(!qrCodeClicked)}>
                            <QRcode className="qrcode" onClick={() => setQrCodeClicked(!qrCodeClicked)}
                                    value={inviteLink} renderAs={"svg"} size={75}/>
                        </div>
                    </div>

                    <div className={"playerContainer"}>
                        <h3>Players:</h3>
                        <Userlist playerProps={playersProps}/>
                    </div>

                    <Button variant="contained" color="primary" type="submit"
                            className={"addPlayer"} onClick={() => setAddPlayerClicked(true)}>
                        ADD PLAYER
                    </Button>
                    <h6>{<IconCheckmark/>} : has voted | {<IconQuestionmark/>} : vote open | {<IconStop/>} : idle</h6>
                </DisplayWhen>


                <DisplayWhen visible={qrCodeClicked && !addPlayerClicked}>
                    <div className="roomName">
                        <h2>Room Name : {roomName}</h2>
                    </div><br/>
                    <div className={"qrcodeBackground"} onClick={() => setQrCodeClicked(!qrCodeClicked)}>
                        <QRcode className="qrcode" onClick={() => setQrCodeClicked(!qrCodeClicked)}
                                value={inviteLink} renderAs={"svg"} size={250}/>
                    </div>
                    <h4>arcake.app/joingame/{roomName}</h4>
                    <div className="InviteLink">
                        <InviteLink inviteLink={inviteLink}/>
                    </div>
                </DisplayWhen>

                <DisplayWhen visible={addPlayerClicked}>
                    <AddPlayerForm setAddPlayerClicked={setAddPlayerClicked} addPlayer={addPlayer}/>
                </DisplayWhen>


            </div>
        </div>
    );
}

export default PlayersSidebar;