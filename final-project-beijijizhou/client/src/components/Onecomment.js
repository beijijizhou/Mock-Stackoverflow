import React, { Component } from 'react'

export default class Onecomment extends Component {
  render() {
    
    var creator = this.props.creator;
    var answers = this.props.item;
    var date = new Date(this.props.time).toString();
    var hr = date.split(" ")[4];
    var day =
      date.split(" ")[1] + " " + date.split(" ")[2] + ", " + date.split(" ")[3];
    hr = hr.split(":")[0] + ":" + hr.split(":")[1];
    return (
      <div className="CommentDiv" >
          
          <div className="midDiv">{answers.text}</div>
         
          <div className="rightDiv">
          
          <li>
            created By <span className="askedBy">{creator}</span>
          </li>
          <div>
            On <span className="askedOn">{day}</span>
          </div>
          <div>
            At <span className="askedAt">{hr}</span>
          </div>
        </div>
         </div>
    )
  }
}
