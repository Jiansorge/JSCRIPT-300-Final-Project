import React from 'react';
import { browserHistory } from 'react-router';
import '../styles/GameStart.css';

export default class GameStart extends React.Component {

    render() {    
        return (
            <div className="main" >
                <div className="content">
                    <h1>SONAR STRIKE!</h1> 

                    <br />
                    <button label="Start Game" onClick={
                        () => {
                            browserHistory.push("/gameplay");
                        }
                    } >START GAME</button>
                </div>
                <img src={require("../assets/images/title_dolphin.png")}  className="title-img" alt=""/>
                <img src={require("../assets/images/title_sonar.gif")}  className="title-img-sonar" alt=""/>
            </div>
        )
    }
}