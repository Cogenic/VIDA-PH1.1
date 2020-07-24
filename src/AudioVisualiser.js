import React, { Component } from 'react';
class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width ) / audioData.length;

    context.lineWidth = 3;
      context.strokeStyle = '#2C2CFF';
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);
    for (const item of audioData) {
        const y = (item /255.0) * height;
//        console.log(y)
        if( y < 100 ){
            context.lineTo(x, y);

        }else if (y > 105){
        }
//        console.log(y);
        x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
  }

  render() {
    return <canvas  width="500%" height="200" right="100%"  ref={this.canvas} />;
  }
}

export default AudioVisualiser;
