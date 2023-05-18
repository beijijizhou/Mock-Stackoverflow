import React, { Component } from "react";
import FakeStackOverflow from "./fakestackoverflow";
import Login from "./Login";
import ContinueGuest from "./ContinueGuest";
import axios from "axios";
import { Logger } from "./Logger";
let logger = new Logger();
export default class Register extends Component {
  constructor() {
    super();
    this.clickSign = this.clickSign.bind(this);
    this.logClick = this.logClick.bind(this);
    logger.log("")
    this.state = {
      username: "",
      email: "",
      password: "",
      confirm: "",
      logger,
    };
  }
  emailchecking(email) {
    var check = /\S+@\S+\.\S+/;
    return check.test(email);
  }
  clickSign() {
    var f = false;
    var alertmessage = "";
    var email = this.state.email;
    var password = this.state.password;
    var username = this.state.username;

    if (username === "") {
      alertmessage = "Empty username";
      f = true;
    }
    if (password === "" || password !== this.state.confirm) {
      alertmessage += "\nInvalid Password";
      f = true;
    }
    if (!this.emailchecking(email)) {
      alertmessage += "\nInvalid email formatting ";
      f = true;
    }

    if (!f) {
      var userinfo = {
        username,
        email,
        password,
      };
      var emailprefix = email.split("@")[0];
      if (password.includes(emailprefix)) {
        alertmessage += "\nPassword can not contain prefix of email address ";
        this.alert(alertmessage);
        f = true;
      }
      if (password.includes(username)) {
        alertmessage += "\nPassword can not contain username ";
        this.alert(alertmessage);
        f = true;
      }
      if (!f) {
        axios.post("http://localhost:8000/signup", userinfo).then((res) => {
          if (!res.data) {
            alertmessage += "\nEmail is already registered ";
            this.alert(alertmessage);
            this.props.setwholepage(
              <Register setwholepage={this.props.setwholepage} />
            );
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
    } else {
      this.alert(alertmessage);
    }
  }
  alert(alertmessage) {
    logger.log(alertmessage);
    this.setState({
      alert: logger.show(),
    });
    setTimeout(() => {
      logger.log("");
      this.setState({
        alert: "",
      });
    }, 2000);
  }
  logClick() {
    this.props.setwholepage(<Login setwholepage={this.props.setwholepage} />);
  }
  render() {
   
    return (
      <div className="wholepage">
        <div className="loginpage">
          <div className="loginColumnDiv">
            <div className="alertbox">{this.state.logger.show()}</div>
            <h3>Username</h3>
            <input
              className="loginbox"
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
            ></input>
            <h3>Email</h3>
            <input
              className="loginbox"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            ></input>
            <h3>Password</h3>
            <h6>Password should not contain the username or the email</h6>
            <input
              type="password"
              className="loginbox"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            ></input>
            <h3>Confirm password</h3>
            <input
              type="password"
              className="loginbox"
              onChange={(e) => {
                this.setState({ confirm: e.target.value });
              }}
            ></input>
            <div className="button" id="loginbutton" onClick={this.clickSign}>
              Sign up
            </div>
          </div>
          <div className="loginbottom">
            Already have an account?
            <span className="signup" onClick={this.logClick}>
              Log in
            </span>
          </div>
          <ContinueGuest setwholepage={this.props.setwholepage} />
        </div>
      </div>
    );
  }
}
