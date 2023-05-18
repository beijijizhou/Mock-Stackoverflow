import React, { Component } from "react";
import FiveQuestions from "./FiveQuestions";
import NoneParticipation from "./NoneParticipation";
export default class UserQuestion extends Component {
  
  
  render() {
    var questionlist = [];
    var i = 0;
    while (i < this.props.userdata.length) {
      questionlist.push(i);
      i++;
    }
   
    questionlist=questionlist.reverse()
 
    return (
      <div>
        {this.props.userdata.length!==0? (
          <FiveQuestions
            data={this.props.userdata}
            questionlist={questionlist}
            setcontent={this.props.setcontent}
            setUserContent={this.props.setUserContent}
            userinfo={this.props.userinfo} 
            editmode={"question"}
          />
        ) : (
          <NoneParticipation para={"asking any question yet"}/>
        )}
      </div>
    );
  }
}
