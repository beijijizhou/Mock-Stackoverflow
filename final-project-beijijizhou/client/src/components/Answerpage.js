import React, { Component } from "react";
import Postanswer from "./Postanswer";
import Header from "./Header";
import FiveAns from "./FiveAns";
import OneDiv from "./OneDiv";
export default class Answerpage extends Component {
  constructor(props) {
    super(props);
    this.handleAnswerButton = this.handleAnswerButton.bind(this);
    this.state = {
      votes: this.props.item.votes,
    };
  }
  handleAnswerButton() {
    this.props.setcontent(
      <Postanswer
        setcontent={this.props.setcontent}
        item={this.props.item}
        userinfo={this.props.userinfo}
      ></Postanswer>
    );
  }
  
  render() {
    var question = this.props.item;
    return (
      <div>
        <Header
          length={question.answers.length}
          setcontent={this.props.setcontent}
          left={"Answers"}
          mid={question.title}
          userinfo={this.props.userinfo}
          view={this.props.item.views}
          setwholepage={this.props.setwholepage}
        />
        <OneDiv
          item={question}
          id={question.id}
          userinfo={this.props.userinfo}
          creator={question.asked_by}
          time={question.askedAt}
        />
        <FiveAns anslist={question.answers} userinfo={this.props.userinfo} />
        {this.props.userinfo && (
          <div
            className="button"
            id="answerbutton"
            onClick={this.handleAnswerButton}
          >
            Answer Question
          </div>
        )}
      </div>
    );
  }
}
