require("babel-polyfill");
import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
import ReactPlayer from 'react-player';
//const React = require('react');
//const { Component } = require('react');
//import React, { Component } from 'react';
//const AudioAnalyser = './AudioAnalyser';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null
    };
  }


    componentDidMount(){
    }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Play;
