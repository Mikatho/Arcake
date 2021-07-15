import React from "react";
import "../../../css/index.css";
import "./submitIdeas.css";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';


function SubmitIdeas() {
    return (
        <div className="createjoinContainer">
            <div className="title">
                YOUR IDEAS
            </div>
            <form action="mailto:project.arcake@gmail.com" className="formContainer submitIdeasForm">
                <table>
                    <tr>
                        <p className="submitIdeasFormHeadline">
                            Please check the box to which your submission fits the most.
                        </p>
                        <br/>
                    </tr>
                    <tr>
                        <td>
                            <div className="radioAlignment">
                                <label className="radioLabel">
                                    <input type="radio" value="general" name="submissions"/>
                                    <span></span>Website
                                </label>
                            </div>
                            <div className="radioAlignment">
                                <label className="radioLabel">
                                    <input type="radio" value="statements" name="submissions"/>
                                    <span></span>Statements
                                </label>
                            </div>
                            <div className="radioAlignment">
                                <label className="radioLabel">
                                    <input type="radio" value="general" name="submissions"/>
                                    <span></span>Game ideas
                                </label>
                            </div>
                            <div className="radioAlignment">
                                <label className="radioLabel">
                                    <input type="radio" value="general" name="submissions"/>
                                    <span></span>Other
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                                className="textFieldColor"
                                id="statementIdeas"
                                label="Type your text here..."
                                multiline
                                rows={4}
                                defaultValue=""
                                variant="filled"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button
                                variant="contained"
                                color="primary"
                                className="classes.button"
                                type="submit"
                            >
                                Send
                            </Button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
}

export default SubmitIdeas;