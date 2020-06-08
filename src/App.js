require("babel-polyfill");
import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
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
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
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

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  render() {
    return (
      <div className="App">
        <div className="controls">
          <button onClick={this.toggleMicrophone} style={{width: 500, height:50, fontSize:35, borderRadius:45,color:"white", backgroundColor:'#1f4bd7'}}>
            {this.state.audio ? 'Listening......' : 'Hello, Shall we begin?........'}

          </button>
        </div>
        {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
      </div>
    );
  }
}

export default App;
