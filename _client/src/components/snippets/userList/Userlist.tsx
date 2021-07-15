import React from "react";
import "./userList.css";
import IconCheckmark from "../../icons/iconCheckmark/IconCheckmark";
import IconQuestionmark from "../../icons/iconQuestionmark/IconQuestionmark";
import IconStop from "../../icons/iconStop/IconStop";
import IClient from "../../../utility/interface/IClient";
import {DisplayWhen} from "../../utility/DisplayWhen";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import IPlayerSidebar from "../../../utility/interface/IPlayerSidebar";


type GameUserProps = {
    playerProps: IPlayerSidebar
}

function Userlist({playerProps}: GameUserProps) {
    const {isGameMaster, userList, kickUser, makeDisplay, makeGamemaster} = playerProps;

    return (
        <>
            <div className={isGameMaster ? "GameMasterUserList" : "userList"}>

                {/*COLUMN TITLES*/}
                <div>Name</div>
                <div>Status</div>
                <DisplayWhen visible={isGameMaster}>Action</DisplayWhen>

                {userList.map(player => {
                    let statusIcons = [];
                    if (player.status.hasVoted) {
                        statusIcons.push(<IconCheckmark/>);
                    } else {
                        statusIcons.push(<IconQuestionmark/>);
                    }

                    if (player.status.isIdle) {
                        statusIcons.push(<IconStop/>);
                    }

                    return (
                        <>
                            <div>{player.name}</div>
                            <div>
                                {statusIcons.map((statusIcon) => {
                                    return (<>{statusIcon}</>)
                                })}
                            </div>
                            <DisplayWhen visible={isGameMaster}>
                                <div>
                                    <UncontrolledDropdown>
                                        <DropdownToggle>: : :</DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={() => makeGamemaster(player)}>Give
                                                Gamemaster</DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem onClick={() => kickUser(player)}>Kick
                                                Player</DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem onClick={() => makeDisplay(player)}>Make
                                                Display</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </DisplayWhen>
                        </>
                    )
                })}
            </div>
        </>
    );
}

export default Userlist;