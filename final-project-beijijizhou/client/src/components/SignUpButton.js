import React, { Component } from 'react'
import Register from './Register';
export default class SignUp extends Component {
    constructor(props) {
      super(props)
    this.signClick = this.signClick.bind(this);
    }
    signClick() {
        this.props.setwholepage(<Register setwholepage={this.props.setwholepage} />);
      }
  render() {
    return (
        <span className="signup" onClick={this.signClick}>Sign up</span>
    )
  }
}
