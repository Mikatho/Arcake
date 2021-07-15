import React, {Component, useEffect, useState} from "react";
import {DisplayWhen} from "../utility/DisplayWhen";
import './sidebars.css';
import "bootstrap/dist/css/bootstrap.css";
import OptionsSidebar from "./optionsSidebar/OptionsSidebar";
import PlayersSidebar from "./playerSidebar/PlayersSidebar";
import IPlayerSidebar from "../../utility/interface/IPlayerSidebar";
import IOptionsSidebar from "../../utility/interface/IOptionsSidebar";

type InviteBarProps = {
    playersProps: IPlayerSidebar
    optionsProps: IOptionsSidebar
}

export const Sidebars = ({playersProps, optionsProps}: InviteBarProps) => {
    const [inviteLink, setInviteLink] = useState(playersProps.inviteLink);
    const [roomName, setRoomName] = useState(playersProps.roomName);
    const [userList, setUserList] = useState(playersProps.userList)
    const [optionsToggle, setOptionsToggle] = useState(false);
    const [playersToggle, setPlayersToggle] = useState(false);
    const [playerSideDisplay, setPlayerSideDisplay] = useState("");


    //init
    useEffect(() => {
        setInviteLink(playersProps.inviteLink);
        setRoomName(playersProps.roomName);
        setUserList(playersProps.userList);
    }, [])

    useEffect(() => {
        setUserList(playersProps.userList);
    }, [playersProps.userList])

    useEffect(() => {
        updatePlayerSideDisplay()
    }, [userList])

    function updatePlayerSideDisplay() {
        let total = 0, finished = 0, notVoted = 0, idle = 0;
        userList.forEach((user) => {
            if (user.status.hasVoted) {
                finished++;
            } else if (user.status.isIdle) {
                idle++;
            } else {
                notVoted++;
            }
            total++;
        })
        setPlayerSideDisplay(`(${total}) Players : 🟢${finished} 🟠${notVoted} 🔴${idle}`)
    }

    return (
        <>
            <div className={"rotateLeft"}>
                <div className="sidebarLeft">
                    <button onClick={() => setOptionsToggle(!optionsToggle)} className="sidebarButton">
                        <span className="sidebarText">Options</span>
                    </button>
                </div>
            </div>

            <div className={"rotateRight"}>
                <div className="sidebarRight">
                    <button onClick={() => setPlayersToggle(!playersToggle)} className="sidebarButton">
                        <span className="sidebarText">{playerSideDisplay}</span>
                    </button>
                </div>
            </div>

            <DisplayWhen visible={optionsToggle}>
                <OptionsSidebar optionsProps={optionsProps}/>
                <div className="closeSidebar" onClick={() => setOptionsToggle(!optionsToggle)}/>
            </DisplayWhen>

            <DisplayWhen visible={playersToggle}>
                <PlayersSidebar playersProps={playersProps}
                                />
                <div className="closeSidebar" onClick={() => setPlayersToggle(!playersToggle)}/>
            </DisplayWhen>

        </>
    );

}
export default Sidebars;