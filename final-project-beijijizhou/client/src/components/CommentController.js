import React, { Component } from "react";
import CommentButton from "./CommentButton";
import ThreeComment from "./ThreeComment";
export default class CommentController extends Component {
  constructor(props) {
    super(props);
    this.setcomment = this.setcomment.bind(this);
    this.state = {
      comment: (
        <div>
         <ThreeComment comments={this.props.item.comments} />
          <CommentButton
            setcomment={this.setcomment}
            userinfo={this.props.userinfo}
            item={this.props.item}
          />
        </div>
      ),
    };
  }
  setcomment(newcomment) {
    
    this.setState({
      comment: newcomment,
    });
  }
  render() {
   
    return <div>
      {this.state.comment}</div>;
  }
}
