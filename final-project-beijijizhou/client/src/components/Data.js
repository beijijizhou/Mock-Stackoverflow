import React, { Component } from "react";
import Header from "./Header";
import FiveQuestions from "./FiveQuestions";
export default class Data extends Component {
  render() {
    var questionlist = [];
    var i = 0;
    while (i < this.props.data.length) {
      questionlist.push(i);
      i++;
    }
    return (
      <div>
        <Header
          length={this.props.data.length}
          setcontent={this.props.setcontent}
          left={"Questions"}
          mid={"All Questions"}
          userinfo={this.props.userinfo}
          setwholepage={this.props.setwholepage}
        />
        <FiveQuestions
          data={this.props.data}
          setcontent={this.props.setcontent}
          questionlist={questionlist}
          userinfo={this.props.userinfo}
        />
      </div>
    );
  }
}
