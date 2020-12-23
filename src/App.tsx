import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Hangman from './components/Hangman';
import Memory from './components/Memory';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/hangman" component={Hangman}/>
          <Route exact path="/memory" component={Memory}/>
        </Switch>
      </div>
    )
  }
}

export default App;
