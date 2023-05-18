import React, { Component } from "react";
import FiveAns from "./FiveAns";
import NoneParticipation from "./NoneParticipation";
export default class UserAnswer extends Component {
  render() {
    var questionlist = this.props.userdata.reverse();

    return (
      <div>
        {questionlist.length > 0 ? (
          <FiveAns
            anslist={questionlist}
            userinfo={this.props.userinfo}
            editmode={"answer"}
            setcontent={this.props.setcontent}
            setUserContent={this.props.setUserContent}
          />
        ) : (
          <NoneParticipation
            para={"answering any questions yet"}
          ></NoneParticipation>
        )}
      </div>
    );
  }
}
