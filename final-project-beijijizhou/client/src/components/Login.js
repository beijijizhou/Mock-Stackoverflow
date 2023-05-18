import React, { Component } from "react";
import "./Login.css";
import FakeStackOverflow from "./fakestackoverflow";
import SignUpButton from "./SignUpButton";
import ContinueGuest from "./ContinueGuest";
import axios from "axios";
import { Logger } from "./Logger";
let logger = new Logger();

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.loginClick = this.loginClick.bind(this);
    logger.log("")
    this.state = {
      email: "",
      password: "",
      logger,
    };
  }
  loginClick() {
    const userinfo = {
      email: this.state.email,
      password: this.state.password,
    };
    var alertmessage;
    axios.post("http://localhost:8000/login", userinfo).then((res) => {
      if (typeof res.data == "string") {
        alertmessage="Invalid login credential"
        logger.log(alertmessage);
        this.setState({
          alert:logger.show() 
        });
        setTimeout(() => {
          logger.log("");
          this.setState({
            alert: "",
          });
        }, 2000);
      } else {
        this.props.setwholepage(
          <FakeStackOverflow
            userinfo={res.data}
            setwholepage={this.props.setwholepage}
          />
        );
      }
    });
  }
  render() {
 
    return (
      <div className="wholepage">
        <div className="loginpage">
        <header>
  <h1 className="title slide-bar">Developer:Hongzhong </h1>
  <p className="subtitle slide-bar">Fakestackoverflow</p>
</header>
        <div className="loading">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
          <div className="loginColumnDiv">
          <div className="alertbox">{this.state.logger.show()}</div>
            <h3>Email</h3>
            <input
              className="loginbox"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  this.loginClick();
                }
              }}
            ></input>
            <h3>password</h3>
            <input
              type="password"
              className="loginbox"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  this.loginClick();
                }
              }}
            ></input>
            <div className="button" id="loginbutton" onClick={this.loginClick}>
              Log in
            </div>
          </div>
          <div className="loginbottom">
            Don't have an account?
            <SignUpButton setwholepage={this.props.setwholepage} />
          </div>
          <ContinueGuest setwholepage={this.props.setwholepage} />
        </div>
      </div>
    );
  }
}
