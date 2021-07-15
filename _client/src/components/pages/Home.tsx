import React from 'react';
import "../../css/index.css";
import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <div className="HomepageBtns">
                <Link to="/creategame">
                    <button className="buttonStyleBasic">Create Game</button>
                </Link>
            </div>
            <div className="HomepageBtns">
                <Link to="/joingame">
                    <button className="buttonStyleBasic">Join Game</button>
                </Link>
            </div>
        </>
    );
}

export default Home;
