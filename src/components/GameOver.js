import React from 'react';
import { browserHistory } from 'react-router';
import '../styles/GameOver.css';


export default class GameOver extends React.Component {

    render() {
        return (
            <div className='gameover-content' >
                <h1>Game Over</h1>

                <h2>Retry?</h2>

                <br />
                    <button label="Return to Title Page" onClick={
                        () => {
                            browserHistory.push("/");
                        }
                    } >Return to Title Page </button>
                    <img src={require("../assets/images/gameover_cheep.gif")}  className="gameover-img-cheep" alt=""/>
            </div>
        )
    }
}