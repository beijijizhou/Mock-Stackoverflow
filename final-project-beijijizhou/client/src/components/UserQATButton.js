import React, { Component } from "react";
import UserTag from "./UserTag";
import UserAnswer from "./UserAnswer";
import UserQuestion from "./UserQuestion";
import axios from "axios";
export default class UserQATButton extends Component {
  constructor(props) {
    super(props);
    this.UserAnswerClick = this.UserAnswerClick.bind(this);
    this.UserQuestionClick = this.UserQuestionClick.bind(this);
    this.UserTagClick = this.UserTagClick.bind(this);
  }
  UserQuestionClick() {
    axios
      .post("http://localhost:8000/loadUserQuestion", this.props.userinfo)
      .then((res) => {
        this.props.setUserContent(
          <UserQuestion
            userinfo={this.props.userinfo}
            userdata={res.data}
            setcontent={this.props.setcontent}
            setUserContent={this.props.setUserContent}
          />
        );
      });
  }
  UserAnswerClick() {
    axios
      .post("http://localhost:8000/loadUserAnswer", this.props.userinfo)
      .then((res) => {
        this.props.setUserContent(
          <UserAnswer
          userinfo={this.props.userinfo}
          userdata={res.data}
            setcontent={this.props.setcontent}
            setUserContent={this.props.setUserContent}
          />
        );
      });
  }
  UserTagClick() {
    axios
      .post("http://localhost:8000/loadUserQuestion", this.props.userinfo)
      .then((res) => {
        this.props.setUserContent(
          <UserTag
          userinfo={this.props.userinfo}
          userdata={res.data}
            setcontent={this.props.setcontent}
            setUserContent={this.props.setUserContent}
          />
        );
      });
  }
  render() {
    return (
      <div>
        <div className="button" id="newbutton" onClick={this.UserQuestionClick}>
          UserQuestion
        </div>
        <div className="button" id="newbutton" onClick={this.UserAnswerClick}>
          UserAnswer
        </div>
        <div className="button" id="newbutton" onClick={this.UserTagClick}>
          UserTag{" "}
        </div>
      </div>
    );
  }
}
