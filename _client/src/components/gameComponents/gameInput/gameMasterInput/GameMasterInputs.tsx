import React, {useEffect, useState} from 'react';
import {DisplayWhen} from "../../../utility/DisplayWhen";
import GameStatus from "../../../../utility/enums/GameStatus";
import Button from "@material-ui/core/Button";

type gameMasterInputProps = {
    isGameMaster: boolean,
    gameStatus: GameStatus,
    onClick:() => void;
}

const GameMasterInputs = function ({isGameMaster, gameStatus, onClick}: gameMasterInputProps) {

    return (
        <DisplayWhen visible={isGameMaster}>
            <DisplayWhen visible={gameStatus == GameStatus.startRound}>
                <Button className="buttonStyleBasic CreateBtn GameBtn" onClick={onClick}
                        variant="contained">Start Round</Button>
            </DisplayWhen>
            <DisplayWhen visible={gameStatus == GameStatus.endRound}>
                <Button className="buttonStyleBasic CreateBtn GameBtn" onClick={onClick}
                        variant="contained">Next</Button>
            </DisplayWhen>
            <DisplayWhen visible={gameStatus == GameStatus.activeRound}>
                <Button className="buttonStyleBasic CreateBtn GameBtn" onClick={onClick}
                        variant="contained">End Round</Button>
            </DisplayWhen>
        </DisplayWhen>
    )
}

export default GameMasterInputs;