import React, {Component, useState} from "react";
import "./optionsSidebar.css"
import "bootstrap/dist/css/bootstrap.css";
import Toggle from "../../formInputs/toggle/Toggle";
import IOptionsSidebar from "../../../utility/interface/IOptionsSidebar";
import Button from "@material-ui/core/Button";
import Games from "../../../utility/enums/Games";
import {DisplayWhen} from "../../utility/DisplayWhen";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";


type OptionsSidebarProps = {
    optionsProps: IOptionsSidebar
}

export const OptionsSidebar = ({optionsProps}: OptionsSidebarProps) => {
    let games = [Games.Dronq, Games.Intimacy] //TODO: GET FROM ENUMS

    const {isGameMaster, game, toggleIsPlayer, toggleIsOnline, isPlayer, isOnline, changeGame, leaveGame, toggleStandardView, isStandardView} = optionsProps;

    return (
        <div className="invSidebar ui sidebar overlay left inverted menu visible">
            <div className={"sidebarContainer"}>
                <div className={"optionsContainer"}>

                    <div className={"optionEntry"}>
                        <h4>Current Game:</h4>

                        <UncontrolledDropdown>
                            <DropdownToggle>{game}</DropdownToggle>
                            <DropdownMenu>
                                {games.map(entry => {
                                    return <DropdownItem
                                        onClick={() => changeGame(entry)}>{entry}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>


                    <div className={"optionEntry"} onClick={toggleIsPlayer}>
                        <h4>Device Type:</h4>
                        <div className={"flexRow"}>
                            Display
                            <Toggle toggleFunction={toggleIsPlayer} toggleBoolean={isPlayer}/>
                            Player
                        </div>
                    </div>

                    <DisplayWhen visible={isGameMaster && isPlayer}>
                        <div className={"optionEntry"} onClick={toggleIsOnline}>
                            <h4>Gamemode:</h4>
                            <div className={"flexRow"}>
                                Offline
                                <Toggle toggleFunction={toggleIsOnline}
                                        toggleBoolean={isOnline}/>
                                Online
                            </div>
                        </div>

                        <div className={"optionEntry"}>

                            <DisplayWhen visible={game == Games.Dronq}>

                                {/*TODO: add onclickEvents and add it to game.tsx, set checked boolean to true*/}
                                <h4>Categorys:</h4>
                                <div className={"CategoryContainer"}>
                                    <label htmlFor={"checkboxStandart"}>standart</label>
                                    <input type="checkBox" id={"checkboxStandart"}/>
                                    <label htmlFor={"checkboxSexual"}>sexual</label>
                                    <input type="checkBox" id={"checkboxSexual"}/>
                                    <label htmlFor={"checkboxAlcoholic"}>alcoholic</label>
                                    <input type="checkBox" id={"checkboxAlcoholic"}/>
                                </div>
                            </DisplayWhen>

                        </div>
                    </DisplayWhen>

                    <DisplayWhen visible={!isPlayer}>
                        <div className={"optionEntry"} onClick={toggleStandardView}>
                            <h4>View:</h4>
                            <div className={"flexRow"}>
                                Mirrored
                                <Toggle toggleFunction={toggleStandardView}
                                        toggleBoolean={isStandardView}/>
                                Standart
                            </div>
                        </div>
                    </DisplayWhen>

                </div>
                <Button variant="contained" color="primary" type="submit"
                        className={"leaveGame"} onClick={leaveGame}>
                    Leave Room
                </Button>
            </div>
        </div>
    );
}

export default OptionsSidebar;