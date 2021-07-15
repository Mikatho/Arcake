import React, {useEffect, useState} from 'react';
import {DisplayWhen} from "../../utility/DisplayWhen";
import StartRound from "./startRound/StartRound";
import Results from "./results/Results";
import Statements from "./statements/Statements";
import "./content.css";
import IContent from "../../../utility/interface/IContent";
import GameStatus from "../../../utility/enums/GameStatus";


const Content = function (ContentProps: IContent) {
    const {gameStatus, results, statement, isPlayer, isStandartView, games} = ContentProps

    function content() {
        return (
            <>
                <DisplayWhen visible={gameStatus == GameStatus.startRound}>
                    <StartRound/>
                </DisplayWhen>

                <DisplayWhen visible={gameStatus == GameStatus.endRound}>
                    <Results Results={results}/>
                </DisplayWhen>

                <DisplayWhen visible={gameStatus == GameStatus.activeRound}>
                    <Statements Statement={statement}/>
                </DisplayWhen>
            </>
        )
    }

    return (<>
            <DisplayWhen visible={isStandartView}>
                <div className="inGameHead">{games}</div>
                <div className="StatementContainer">
                    {content()}
                </div>
            </DisplayWhen>

            <DisplayWhen visible={!isStandartView}>
                <div className={"rotate180"}>
                    <div className="inGameHead">{games}</div>
                    <div className="StatementContainer">
                        {content()}
                    </div>
                </div>
                <div>
                    <div className="inGameHead">{games}</div>
                    <div className="StatementContainer">
                        {content()}
                    </div>
                </div>
            </DisplayWhen>
        </>
    )
}

export default Content;