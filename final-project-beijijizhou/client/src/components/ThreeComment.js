import React, { Component } from "react";
import Onecomment from "./Onecomment";
export default class ThreeComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      range : 3,
    };
    this.prevClick = this.prevClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
  }
  prevClick() {
    var counter = this.state.counter;
    if (counter - this.state.range >= 0) {
      counter -= this.state.range;
      this.setState({
        counter: counter,
      });
    }
  }
  nextClick() {
    var length = this.props.comments.length;
    var counter = this.state.counter;
    if (length - counter >= this.state.range) {
      counter += this.state.range;
      this.setState({
        counter: counter,
      });
    }
  }
  render() {
    var comments = this.props.comments;
    var start = this.state.counter;
    var end =start+this.state.range
    comments = comments.slice(start, end);
    var len=this.props.comments.length;
    return (
      <div>
        {/* <div className="leftDiv">{this.props.comments.length+" "}Comments</div> */}
        {this.props.comments.length>this.state.range&& <div className="PrevNext">
          {}<span className="nextbutton" onClick={this.prevClick}>
            {" "}
            Prev
          </span>
          {end<len&&<span className="nextbutton" onClick={this.nextClick}>
            {" "}
            Next
          </span>}
        </div>}
       
        {comments.map((comments) => {
          return (
            <div key={comments._id}>
              <Onecomment
                item={comments}
                creator={comments.asked_by}
                time={comments.create_time}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
