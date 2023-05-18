import React, { Component } from "react";
import OneDiv from "./OneDiv";
export default class FiveAns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      range:5,
    };
    this.prevClick = this.prevClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
  }
  prevClick(){
    var counter=this.state.counter
    if(counter-this.state.range>=0){
      counter-=this.state.range
      this.setState({
        counter:counter
      })
    }
  }
  nextClick(){
    var length=this.props.anslist.length;
    var counter=this.state.counter
    if(length-counter>=this.state.range){
      counter+=this.state.range
      this.setState({
        counter:counter
      })
    }
  }
  render() {
    var start = this.state.counter;
    var end=start + this.state.range
    var anslist = this.props.anslist.slice(start, end);
    var len=this.props.anslist.length;
    return (
      <div>
        <div className="leftDiv">{this.props.anslist.length+" "}Answers</div>
        {this.props.anslist.length>this.state.range&&<div className="PrevNext">
         {<span className="nextbutton" onClick={this.prevClick}> Prev</span>} 
         {end<=len&&<span className="nextbutton" onClick={this.nextClick}> Next</span>} 
        </div>}
        {anslist.map((ans) => {
          return (
            <div key={ans._id}>
              <OneDiv
                item={ans}
                id={ans.id}
                userinfo={this.props.userinfo}
                creator={ans.ans_by}
                time={ans.ans_date_time}
                editmode={this.props.editmode}
                setcontent={this.props.setcontent}
                setUserContent={this.props.setUserContent}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
