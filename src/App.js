import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Wrapper from './components/Wrapper';
import GameStart from './components/GameStart';
import GamePlay from './components/GamePlay';
import GameOver from './components/GameOver';
import NotFound from './components/NotFound';
import './App.css';

class App extends React.Component {
  render() {
    return (

      <Router history={browserHistory}>
          <Route component={Wrapper}>
              <Route component={GameStart} exact path="/" />
              <Route component={GamePlay} path="/gameplay" />
              <Route component={GameOver} path="/gameover" />
              <Route component={NotFound}  />
          </Route>
      </Router>

    );
  }
}

export default App;
