import React from "react";
import "../../../../css/index.css";
import Button from "@material-ui/core/Button";

let socket: any;


type ButtonProps= {
    statementString: string[];
    handleAnswerInput: (eee: string) => void;
}

function ButtonInput({statementString, handleAnswerInput}:ButtonProps) {

    const renderUserButtons = () => {
        if(statementString)
        return statementString.map((statement ) => (
            <Button variant="contained" onClick={() => {handleAnswerInput(statement)}}>{statement}</Button>
        ))
    }

    return (

        <div className="buttonContainer">
            {    //renderUserButtons()
                statementString.map(statement => {
                    if (statement !== '') {
                        return <button className="buttonStyleBasic" onClick={() => {
                            handleAnswerInput(statement)
                        }}>{statement}</button>
                    }
                })
            }
        </div>

    );
}


export default ButtonInput;