require("babel-polyfill");
import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { hot } from 'react-hot-loader/root';
import refresh from './api.js'
const ReactDOM = require('react-dom');

class Music extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            url: this.props.url,
            audioHash:Date.now(),
            time: new Date().toLocaleString(),
        }
//        console.log(this.props.url + "bye");
    }
    getData = (data) => {
        this.setState({ url: data });
    };
    handleOnReady = () => setTimeout(() => this.setState({ playing: true }), 100);

    componentDidMount(){
        const socket = io.connect('http://localhost:5000/');
        socket.on('news',this.getData);
    }
    /* Removing the listener before unmounting the component in order to avoid addition of multiple listener at the time revisit*/
    componentWillUnmount() {
//        socket.off("get_data");
        clearInterval(this.intervalID);
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.url !== this.state.url){
//            this.setState({url: this.state.url});
            }
    }
     tick() {
        this.setState({
          time: new Date().toLocaleString()
        });
    }
    render(){
        return (
           <div>
            <ReactAudioPlayer
                src={`/audio/${this.state.url}.mp3?${this.audioHash}`}
//                muted={false}
                autoPlay
           />
            </div>
        );

    }
}






export default Music;
