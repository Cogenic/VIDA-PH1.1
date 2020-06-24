require("babel-polyfill");
import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
import ReactPlayer from 'react-player';
//const React = require('react');
//const { Component } = require('react');
//import React, { Component } from 'react';
//const AudioAnalyser = './AudioAnalyser';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null
    };
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

    componentDidMount(){
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }


  render() {
    return (
      <div className="App">
            {this.state.audio ? 'Listening......' : 'Hello, Shall we begin?........'}
        {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
      </div>
    );
  }
}

export default App;
