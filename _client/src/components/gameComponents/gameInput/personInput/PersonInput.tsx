import React, {useState} from "react";
import "../../../../css/index.css";
import IClient from "../../../../utility/interface/IClient";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";



type PersonProps = {
    players: IClient[];
    handleAnswerInput: (eee: string) => void;
}

function PersonInput({players, handleAnswerInput}: PersonProps) {
    return (
        <UncontrolledDropdown>
            <DropdownToggle>
                Choose a player
            </DropdownToggle>
            <DropdownMenu>
                {players.map(player => {
                    return <DropdownItem onClick={() => handleAnswerInput(player.name)}>{player.name}</DropdownItem>
                })}
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}


export default PersonInput;