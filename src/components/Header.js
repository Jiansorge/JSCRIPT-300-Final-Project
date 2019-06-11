import React from 'react';
import '../styles/Header.css'; 

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: this.props.score,
            lives: this.props.lives,
            livesSprite: this.showLives(this.props.lives),
        }
    }

    componentWillReceiveProps(newProps) {
        if (JSON.stringify(this.props) !== JSON.stringify(newProps)) {
            this.setState({
                score: newProps.score,
                lives: newProps.lives,
                livesSprite: this.showLives(newProps.lives),
            })
        }
    }

    showLives(lives) {
        let livesArray = [];
        for (let i = 0; i < lives; i++) {
            livesArray.push((
                <div key={"lives-" + i}>
                    <img src={require("../assets/images/dolphin.png" )}className="shipSprite" alt="1-up" />
                </div>
            ));
        }
        return livesArray;
    }

    render() {
        return (
            <div >
                <div className="content-left">
                    <div className="content-lives"> {this.state.livesSprite} </div>
                </div>
                <div className="content-right">                                     Score: {this.state.score}
                </div>
            </div>
        )
    }
}
                    // <button label="Quit Game" onClick={
                    //         () => {
                    //             browserHistory.push("/");
                    //             return this.props.onClick;
                    //         }
                    //     } >Quit Game</button>