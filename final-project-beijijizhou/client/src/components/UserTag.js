import React, { Component } from "react";
import NoneParticipation from "./NoneParticipation";
import Tags from "./Tags";
export default class UserTag extends Component {
 
  render() {
    var questionlist = this.props.userdata;
    var tagFound=false;
    for(let question of questionlist){
      
      if(question.tags.length>0){
        tagFound=true;
        break;
      }
    }
    return (
      <div>
        {tagFound > 0 ? (
          <Tags
            data={questionlist}
            handleTitleClick={this.handleTitleClick}
            setcontent={this.props.setcontent}
            userinfo={this.props.userinfo}
            editmode="tag"
            setUserContent={this.props.setUserContent}
          />
        ) : (
          <NoneParticipation para={"creating any tags"} />
        )}
      </div>
    );
  }
}
