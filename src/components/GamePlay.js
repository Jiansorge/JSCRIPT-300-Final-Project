import React from 'react';
import { browserHistory } from 'react-router';
import Header from './Header.js';
import '../styles/Main.css';

const shipAttackSpeedInterval = 20;
const shipAttackSpeed = 20;
const enemyInterval = 300;
//const enemiesSpeedInterval = 30;
const enemiesSpeed = 15;

export default class GamePlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pause: true,
            shipPosition: {     
                left: 0,
            },
            shipSprite: 'dolphin.gif',
            shipAttacksX: [],
            shipAttacksY: [],
            score: 0,
            lives: 3,
            gameOver: false,
            enemiesX: [],
            enemiesY: [],
            enemyCount: 0,
            enemiesArray: [],
            enemiesSpeedInterval: 70,
        }

    }

    componentWillMount() {
        this.setState({
            pause:true
        })
    }

    componentDidMount() {
        this.runGame();
        this.setState({
            bottom: this.getBounds().bottom - 165, 
            pause:false,
            enemiesSpeedInterval: 50
        });
        this.refs.mainContainer.focus();
    }

    getBounds() {
        let boundingObject = null; 
        boundingObject = this.refs.gameContainer.getBoundingClientRect();
        return boundingObject;
    }

    runGame() { 
            setInterval(() => {
                if (!this.state.pause)
                    this.updateShipAttacksY();
            }, shipAttackSpeedInterval);

            setInterval(() => {
               if (!this.state.pause) 
                    this.generateEnemies();
            }, enemyInterval)

            setInterval(() => {
                if (!this.state.pause)
                    this.updateEnemiesY();
            }, this.state.enemiesSpeedInterval);
    }

    generateShipAttack() {
        let x = this.state.shipPosition.left;
        let { shipAttacksX, shipAttacksY } = this.state;
        let { bottom } = this.getBounds();
        shipAttacksX.push(x);
        shipAttacksY.push(bottom - 180); // y location of ship attack
        this.setState({ shipAttacksX, shipAttacksY });
    }

    generateEnemies() {
        if(!this.state.pause) {
            let { enemiesX, enemiesY, enemyCount, enemiesArray } = this.state;  let width = Math.floor(this.getBounds().width);
            width = width - 65; // make sure enemy doesn't spawn past game container
            enemiesX.push(Math.floor(Math.random() * width) + 1); // random x location
            enemiesY.push(0); // start at top of container
            enemiesArray.push(1);
            enemyCount++;
            this.setState({ 
                enemiesX, 
                enemiesY, 
                enemyCount 
            });
        }
        return;
    }

    mouseMove(event) {
        if (!this.state.pause) {
            let { left, width} = this.getBounds();  
            width = width - 50;
            //height = height - 30;
            let x = event.clientX - left;
            //let y = event.clientY-top;  
            if (x < width) {
                this.setState({
                    shipPosition: {left:x}
            })}

            // if (x < width && y < height) {
            //     this.setState({
            //         shipPosition: { left: x, top: y }
            //     })
            // }  else if (x < width) {
            //     this.setState({
            //         shipPosition: {left:x}
            //     })
            // } else if (y < height) {
            //     this.setState({
            //         shipPosition: {top:y}
            //     })
            // }
        }
    }

    updateShipAttacksY() {
        let { shipAttacksY, shipAttacksX, enemiesX, enemiesY, enemyCount, enemiesArray, score, enemiesSpeedInterval } = this.state;
        for (let i = 0; i < shipAttacksY.length; i++) { // loop through all ship attacks
            if (shipAttacksY[i] > -shipAttackSpeed) {
                shipAttacksY[i] = shipAttacksY[i] - shipAttackSpeed;
                let bx = shipAttacksX[i]+40;  // center render of attack
                let by = shipAttacksY[i];
                for (let j = 0; j < enemiesX.length; j++) {
                    let ex = enemiesX[j];
                    let ey = enemiesY[j];
                    // if enemy is hit by ship attack
                    if (enemiesArray[j] === 1 && (bx >= ex) && (bx - ex) <= 85 && Math.abs(by - ey) <= 10) {
                        shipAttacksY[i] = -shipAttackSpeed;
                        enemiesY[j] = this.state.bottom + enemiesSpeed;
                        enemiesArray[j] = 0;
                        enemyCount--;
                        score++;
                        // enemiesSpeedInterval: 75
                    }
                }
            }
        }
        this.setState({ shipAttacksY, enemiesY, enemyCount, score, enemiesArray, enemiesSpeedInterval });
    }

    updateEnemiesY() {  
        let { enemiesY, enemiesX, shipPosition, bottom, lives } = this.state;
        for (let i = 0; i < enemiesY.length; i++) {
            if (enemiesY[i] > -enemiesSpeed) {
                enemiesY[i] = enemiesY[i] + enemiesSpeed;
                let ex = enemiesX[i]+10; // center enemy x location
                let ey = enemiesY[i];
                let px = shipPosition.left;
                // if enemy is close to ship
                if (ey <= bottom - 20 && ey > bottom - 30 && Math.abs(ex - px) <=55) {  
                    this.gamePause();
                    this.shipHit();
                    lives--;
                    this.setState({
                        lives: lives,
                    });
                }
            }
        }
        this.setState({ enemiesY });
    }

    createShipAttack(index, left, top) { 
        return (
            <div key={`shipAttack-${index}`} style={{ position: 'absolute', left, top, alignContent: 'center' }} >  
                <img src={require("../assets/images/sonar7.gif")} alt="o" className="attack" />  
            </div> 
        )
    }

    renderShipAttacks() {
        return this.state.shipAttacksX.map((value, index, array) => {
            let top = ((this.state.shipAttacksY[index]) + "px").toString();
            let left = ((this.state.shipAttacksX[index])-13 + "px").toString();
            let shipAttacksYIndex = this.state.shipAttacksY[index];
            if (shipAttacksYIndex > 0) {
                return this.createShipAttack(index, left, top);
            } else {
                return null;
            }
        }, this);
    }

    renderEnemies() {
        let { bottom, enemiesArray } = this.state;
        return this.state.enemiesX.map((value, index, array) => 
        {
            let top = (this.state.enemiesY[index] + "px").toString();
            let left = (value + "px").toString();
            let enemiesYIndex = this.state.enemiesY[index];
            if (enemiesYIndex < bottom + 110) {
                if (enemiesArray[index] === 1) {
                    return (
                        <div key={`enemy-${index}`} style={{ position: 'absolute', left: left, top: top, alignContent: 'center' }}>
                            <img src={require("../assets/images/cheepcheep.gif")} width="70px" alt='V' />
                        </div>
                    )
                }
            }
            else if (enemiesArray[index] === 1 && enemiesYIndex >= bottom) {
                enemiesArray[index] = 0;
                this.setState({
                    enemiesArray,
                })
            }
        return null;
        }, this);
    }

    gameOver() {
        this.setState({
            gameOver: true,
        })
        this.gamePause();
        browserHistory.push("/gameover");
    }

    shipHit(hit = true) {
        let img = hit ? "shipHit5.gif" : "dolphin.gif";
        this.setState({
            shipSprite: img
        })
        if (hit) {
            setTimeout(() => {
                this.shipHit(false);
            }, 2300)
        }
         if (this.state.lives <= 0) {
            setTimeout(this.gameOver(), 1500);
        }
    }

    gamePause() {
        if (!this.state.gameOver ) {
            this.setState({
                pause: !this.state.pause,
            })
        } else {
            this.setState({
                pause: true
            });
        }
    }

    keyPress(event) {     
        if (event.which === 13) {
            // check if enter is pressed to pause/unpause
            this.gamePause();
        } else if (this.state.pause && event.which === 32) {
            // check if spacebar is pressed to unpause
            this.gamePause();
        } else if (!this.state.pause && event.which === 32) {
                this.generateShipAttack();
        }
    }

    mouseClick(mouseup) {
        if (!this.state.pause) {
            if (mouseup) {
                this.generateShipAttack();
            }
        } else {
            this.gamePause();
        }
    }

    renderShip() {
        return(
             <img src= {require("../assets/images/" + this.state.shipSprite)}
        className="shipSprite" alt="M" />
        )
    }

    render() {
        return (
            <div className="main-container" 
                ref="mainContainer" 
                tabIndex="0"
                onKeyPress={this.keyPress.bind(this)} 
                onClick={this.mouseClick.bind(this)}>

                <div className="main-content">
                    <div className="game-container" 
                        ref="gameContainer" 
                        onMouseMove={this.mouseMove.bind(this)}
                    >
                        <div key="game-header" style={{ position: "relative" }}>
                            <Header score={this.state.score} 
                                    lives={this.state.lives} />
                            {this.renderEnemies()}
                            {this.renderShipAttacks()}
                        </div>
                        <div className="ship-container" >
                            <div className="ship" 
                                style={{ left: (this.state.shipPosition.left + "px").toString() }}
                            >
                                {this.renderShip()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}
