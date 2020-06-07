import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';

class audio extends Component{
    constructor(props){
        super(props);
        this.state={
            audio:null
        },
        this.toggleMicrophone= this.toggleMicrophone.bind(this);
    }
//We need a method that will use getUsermedia to request access to the microphone and set audio stream in the state if it is successful.
//Add the following component
    async getMicrophone(){
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
        this.setState({audio});
    }
//Add a method to stop the audio capture too. This loops through each of the MediaTracks associated
//with the MediaStream that getUermedia returns and stops them, finally removing the stream from the state.
    stopMicrophone(){
        this.state.audio.getTracks().forEach(track => track.stop());
        this.setState({audio: null});
    }
//Add a method to toggle the microphone on and off.
    toggleMicrophone() {
        if(this.state.audio){
            this.stopMicrophone();
        }else{
            this.getMicrophone();
        }
    }
    render(){
      return (
          <div className="audio">
            <div className="controls">
              <button onClick={this.toggleMicrophone}>
                {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
              </button>
            </div>
            {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
          </div>
        );
   }
}

//We're going to use this toggle mehto dwith the button in the interface. To do so, we'll need to bind its context tothe component
//Add the following to the construcdtior:


export default audio;
