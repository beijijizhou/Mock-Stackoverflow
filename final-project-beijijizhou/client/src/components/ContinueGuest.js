import React, { Component } from 'react'
import FakeStackOverflow from './fakestackoverflow';
import axios from 'axios';
export default class ContinueGuest extends Component {
    constructor(props) {
      super(props)
      this.continueClick = this.continueClick.bind(this);
    }
    continueClick() {
      axios.get("http://localhost:8000/guestLogin").then(()=>{
        this.props.setwholepage(<FakeStackOverflow setwholepage={this.props.setwholepage}/>);
      })
       
      }
  render() {
    return (
        <div className="signup" id="continue" onClick={this.continueClick}>
        Continue as guest
      </div>
    )
  }
}


