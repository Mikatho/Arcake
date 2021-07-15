import React, {Component} from 'react';
import "../../pages/game/game.css";
import {DisplayWhen} from "../../utility/DisplayWhen";
import ButtonInput from "./buttonInput/ButtonInput";
import TextInput from "./textInput/TextInput";
import StatementType from "../../../utility/enums/StatementType";
import PersonInput from "./personInput/PersonInput";
import IClient from "../../../utility/interface/IClient";
import IGameInput from "../../../utility/interface/IGameInput";
import GameStatus from "../../../utility/enums/GameStatus";
import GameMasterInputs from "./gameMasterInput/GameMasterInputs";


type IInputState = {
    showTextInput: boolean;
    showButtons: boolean;
    showPersons: boolean;
    buttonPersonContent: IClient[];
    buttonAnswerContent: string[];
}

interface IInputProps {
    statement: IGameInput;
    players: IClient[];
    handleAnswerInput: (answer: string) => void;
    gameStatus: GameStatus;
    isPlayer: boolean;
    isGameMaster: boolean,
    gameMasterOnClick: () => void;
}

export default class GameInput extends Component<IInputProps, IInputState> {
    constructor(props: any) {
        super(props);
        this.state = {
            showTextInput: false,
            showButtons: false,
            showPersons: false,
            buttonPersonContent: [],
            buttonAnswerContent: [""]
        }

    }


    static getDerivedStateFromProps(nextProps: IInputProps, prevState: IInputState) {
        // do things with nextProps.someProp and prevState.cachedSomeProp
        switch (nextProps.statement.type) {
            case StatementType.NoInput:
                return {
                    showPersons: false,
                    showTextInput: false,
                    buttonPersonContent: [],
                    showButtons: false,
                    buttonAnswerContent: []
                };
            case StatementType.ButtonInput:
                return {
                    showPersons: false,
                    showTextInput: false,
                    buttonPersonContent: [],
                    showButtons: true,
                    buttonAnswerContent: nextProps.statement.answers
                };
            case StatementType.NumberInput:
                return {
                    showPersons: false,
                    showTextInput: true,
                    buttonPersonContent: [],
                    showButtons: false,
                    buttonAnswerContent: []
                };
            case StatementType.PersonInput:
                return {
                    showPersons: true,
                    showTextInput: false,
                    buttonPersonContent: nextProps.players,
                    showButtons: false,
                    buttonAnswerContent: []
                };
        }
    }

    public render() {
        return (

            <div className="gameInputContainer">
                <DisplayWhen visible={this.props.gameStatus == GameStatus.activeRound && this.props.isPlayer}>
                    <div className="inputContainer">
                        <DisplayWhen visible={this.state.showTextInput}>
                            <TextInput handleAnswerInput={this.props.handleAnswerInput}
                                       statementString={this.props.statement.answers}/>
                        </DisplayWhen>
                        <DisplayWhen visible={this.state.showButtons}>
                            <ButtonInput handleAnswerInput={this.props.handleAnswerInput}
                                         statementString={this.state.buttonAnswerContent}/>
                        </DisplayWhen>
                        <DisplayWhen visible={this.state.showPersons}>
                            <PersonInput handleAnswerInput={this.props.handleAnswerInput}
                                         players={this.state.buttonPersonContent}/>
                        </DisplayWhen>
                    </div>
                </DisplayWhen>

                <GameMasterInputs gameStatus={this.props.gameStatus} isGameMaster={this.props.isGameMaster} onClick={this.props.gameMasterOnClick}/>
            </div>
        );
    }
}