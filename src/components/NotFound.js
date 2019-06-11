import React from 'react';
import { browserHistory } from 'react-router';

export default class GameOver extends React.Component {
    render() {
        console.log("Not Found");
        return (
            <div className="mainContainer">
                <div className="content">
                    404 Page Not Found
                    <br />
                    <br />
                    <button label="Go to Title Page" onClick={
                        () => {
                            browserHistory.push("/");
                        }
                    } >Go to Title Page </button>
                </div>
            </div>
        )
    }
}