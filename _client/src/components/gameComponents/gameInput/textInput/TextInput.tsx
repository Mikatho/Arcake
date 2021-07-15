import React, {useState} from "react";
import "../../../../css/index.css";
import "../../../pages/game/game.css";

let socket: any;

type TextProps= {
    statementString: string[];
    handleAnswerInput: (eee: string) => void;

}

function TextInput({statementString, handleAnswerInput}:TextProps) {
    const [answer, setAnswer] = useState('')

    function onInputChange(e: any) {
        setAnswer(e.target.value);
    }

    function submitAnswer() {
        handleAnswerInput(answer);
    }

    return (
        <div className="inputContainer inputStyle">
            <div className="input-group">
                <input onChange={onInputChange} type="number" className="form-control" placeholder="" aria-label="Example text with button addon"
                       aria-describedby="button-addon1"/>
                <div className="input-group-prepend numberInputBtn">
                    <button onClick={submitAnswer} className="btn btn-outline-secondary" type="button" id="button-addon1">Send</button>
                </div>
            </div>
        </div>

    );
}


export default TextInput;