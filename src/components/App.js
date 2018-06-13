import React, { Component } from 'react';
import myIcon from '../images/icon.png';

function PaintImage(props) {
  return (
    <div>
      <img id='icon'
        alt='icon'
        src={myIcon}
        style={
          {left: props.location[0], top: props.location[1]}
        }
      />
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: [0, 0],
      stepSize: 1,
    }

    this.handleMovement = this.handleMovement.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
  }

  handleSlider(event) {
    this.setState({
      stepSize: Number(event.target.value)
    })
  }

  handleMovement(event) {
    event.preventDefault();
    let canvasWidth = 350;
    let canvasHeight = 350;
    let xCoordinate = this.state.location[0];
    let yCoordinate = this.state.location[1];
    let stepSize = this.state.stepSize;
    switch(event.keyCode) {
      case 37:
        //left
        if (xCoordinate - stepSize >= 0) {
          xCoordinate -= stepSize;
        } else {
          xCoordinate = 0;
        }
        break;
      case 38:
        //up
        if (yCoordinate - stepSize >= 0) {
          yCoordinate -= stepSize;
        } else {
          yCoordinate = 0;
        }
        break;
      case 39:
        //right
        if (xCoordinate + stepSize <= canvasWidth) {
          xCoordinate += stepSize;
        } else {
          xCoordinate = canvasWidth;
        }
        break;
      case 40:
        //down
        if (yCoordinate + stepSize <= canvasHeight) {
          yCoordinate += stepSize;
        } else {
          yCoordinate = canvasHeight;
        }
        break;
      default:
        break;
    }
    this.setState({
      location: [xCoordinate, yCoordinate],
    })
  }

  render() {
    window.addEventListener('keydown', this.handleMovement);
    return (
      <div className='container'>
        <h1>Move the object with arrow keys</h1>
        <div className='area'>
          <PaintImage location={this.state.location} />
        </div>
        <div className='slideContainer'>
          <h3>Increase your step size below</h3>
          <input type='range'
            min='1'
            max='50'
            value={this.state.stepSize}
            step='1'
            className='slider'
            id='myRange'
            onChange={this.handleSlider}
          />
        </div>
      </div>
    );
  }
}

export default App;
