import React, {useEffect, useState} from "react"
import "./addPlayerForm.css"
import Button from "@material-ui/core/Button";
import TextInput from "../../../formInputs/textInput/TextInput";
import Toggle from "../../../formInputs/toggle/Toggle";
import IPlayerProperties from "../../../../utility/interface/IPlayerProperties";

type addPlayerFormProps = {
    setAddPlayerClicked: (bool: boolean) => void;
    addPlayer: (playerName: string, playerProperties: IPlayerProperties) => void;
}

function AddPlayerForm({setAddPlayerClicked, addPlayer}: addPlayerFormProps) {
    const [playerProperties, setPlayerProperties] = useState<IPlayerProperties>({isSingle: true, isDrinking: true})
    const [playerName, setPlayerName] = useState('');
    const [playerHasName, setPlayerHasName] = useState(false);

    function toggleSingle() {
        setPlayerProperties({
            isSingle: !playerProperties.isSingle,
            isDrinking: playerProperties.isDrinking
        })
    }

    function toggleDrinking() {
        setPlayerProperties({
            isSingle: playerProperties.isSingle,
            isDrinking: !playerProperties.isDrinking
        })
    }

    function onChangePlayerName(e: any) {
        setPlayerName(e.target.value)
        setPlayerHasName(e.target.value.length > 0)
    }

    function addPlayerClick(e: any) {
        if (playerHasName) {
            e.preventDefault()
            setAddPlayerClicked(false);
            addPlayer(playerName, playerProperties)
        }
    }

    return (
        <form className={"formContainer"}>
            <TextInput onChangeFunction={onChangePlayerName} label={"Name"} id={"nameID"} defaultValue={""}/>

            Are you single?
            <div className={"flexRow"} onClick={toggleSingle}>
                No
                <Toggle toggleBoolean={playerProperties.isSingle} toggleFunction={toggleSingle}/>
                Yes
            </div>

            Do you drink alcohol?
            <div className={"flexRow"} onClick={toggleDrinking}>
                No
                <Toggle toggleBoolean={playerProperties.isDrinking} toggleFunction={toggleDrinking}/>
                Yes
            </div>

            <br/>

            <div className={"flex"}>
                <Button variant="contained" color="primary" type="submit"
                        className={"addPlayer"} onClick={addPlayerClick}>
                    ADD PLAYER
                </Button>
                <div className={"spacing"}/>
                <Button variant="contained" color="primary"
                        className={"cancel"} onClick={() => setAddPlayerClicked(false)}>
                    CANCEL
                </Button>
            </div>
        </form>
    )
}

export default AddPlayerForm;