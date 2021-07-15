import React from 'react';
import {Layout} from "./components/utility/Layout";
import {Route, Switch} from "react-router-dom";
import Home from "./components/pages/Home";
import CreateGame from "./components/pages/createJoinGame/CreateGame";
import JoinGame from "./components/pages/createJoinGame/JoinGame";
import AboutUs from "./components/pages/aboutUs/AboutUs";
import Intimacy from "./components/pages/howToPlay/Intimacy";
import Dronq from "./components/pages/howToPlay/Dronq";
import Game from "./components/pages/game/Game";
import SubmitIdeas from "./components/pages/submitIdeas/SubmitIdeas";
import {CookiesProvider} from 'react-cookie';


function App() {
    console.log(process.env.NODE_ENV);
    return (
        <CookiesProvider>
            <Layout>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/creategame" component={CreateGame}/>
                        <Route exact path="/joingame" component={JoinGame}/>
                        <Route path="/joingame/:roomName" component={JoinGame}/>
                        <Route path="/aboutus" component={AboutUs}/>
                        <Route path="/howtoplay/dronq" component={Dronq}/>
                        <Route path="/howtoplay/intimacy" component={Intimacy}/>
                        <Route path="/submitideas" component={SubmitIdeas}/>
                        <Route path="/game/:playerID/:roomName" component={Game}/>
                    </Switch>
            </Layout>
        </CookiesProvider>
    );
}

export default App;
