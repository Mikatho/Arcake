import React from 'react';
import {FormControlLabel, FormGroup, Switch as MatSwitch} from "@material-ui/core";

type ToggleProps = {
    toggleFunction: () => void,
    toggleBoolean: boolean,
}

const Toggle = function ({toggleFunction, toggleBoolean}:ToggleProps) {

    return (
        <FormGroup>
            <FormControlLabel
                control={<MatSwitch checked={toggleBoolean}
                                    onChange={toggleFunction}/>}
                label=""
            />
        </FormGroup>
    )
}

export default Toggle;