import React, { Component } from "react";
import CommentButton from "./CommentButton";
import ThreeComment from "./ThreeComment";
import axios from "axios";
import { Logger } from "./Logger";
var logger = new Logger();
export default class NewComment extends Component {
  constructor(props) {
    super(props);
    this.postCommentClick = this.postCommentClick.bind(this);
    logger.log("");
    this.state = {
      comment: "",
      logger,
    };
  }
  postCommentClick() {
    var newcomment = this.state.comment;
    var f = false;
    var alertmessage = "";
    if (newcomment.length > 140) {
      alertmessage += "\n The comment can not be more than 140 characters";
      f = true;
    }

    if (!f) {
      var req = {
        comment: newcomment,
        id: this.props.item._id,
        userinfo: this.props.userinfo,
        qadd: this.props.item.views !== undefined,
      };
      axios.post("http://localhost:8000/addComment", req).then((res) => {
        this.props.setcomment(
          <div>
            <ThreeComment comments={res.data.comments} />
            <CommentButton
              setcomment={this.props.setcomment}
              userinfo={this.props.userinfo}
              item={this.props.item}
            />
          </div>
        );
      });
    } else {
      logger.log(alertmessage);
      this.setState({
        alert: logger.show(),
      });
      setTimeout(()=>{
        logger.log("");
        this.setState(logger);
      },2000)
    }
  }
  render() {
    return (
      <div>
        <div className="alertbox">
          {this.state.logger.show()}
          </div>
        <div className="commentSection">
          <textarea
            onChange={(e) => {
              this.setState({ comment: e.target.value });
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                this.postCommentClick();
              }
            }}
          />
          <div>
            <div className="button" onClick={this.postCommentClick}>
              Add comment
            </div>
          </div>
        </div>
      </div>
    );
  }
}
