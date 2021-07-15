import React from 'react';
import TextField from "@material-ui/core/TextField";
import "./textInput.css";

type SwitcherProps = {
    onChangeFunction: (input:any) => void,
    label:string,
    id:string,
    defaultValue:string,
}

const TextInput = function ({onChangeFunction, defaultValue, id, label}:SwitcherProps) {

    return (
        <TextField
            className={"createJoinInput"}
            required
            id={id}
            label={label}
            defaultValue={defaultValue}
            variant="outlined"
            onChange={onChangeFunction}
        />
    )
}

export default TextInput;