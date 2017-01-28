import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

var App = React.createClass({
  
  getInitialState: function() {
    return {
      chores: []
    }
  },
  
  componentDidMount() {
      var _this = this;
    this.serverRequest = axios.get("https://chorescore-pljhll.c9users.io/api/chores")
    .then(function(result) {    
      _this.setState({
        chores: result.data
      });
    })
  },
    componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  
  render: function() {
    return (
      
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. HELLO DAVE! BOOM! WHAT?!
        </p>
        
        <ul>
        {this.state.chores.map(function(chore) {
          return (
            <li>
              
                {chore.name}
                was done by 
                {chore.who} on
                {chore.when}
              
            </li>
          );
        })}
        </ul>
      </div>
    );
  }
});

export default App;