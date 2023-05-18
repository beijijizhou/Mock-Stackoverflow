import React, { Component } from "react";
import NewComment from "./NewComment";
import { Logger } from "./Logger";
var logger = new Logger();
export default class CommentButton extends Component {
  constructor(props) {
    super(props);
    this.newcommentClick = this.newcommentClick.bind(this);
    logger.log("");
    this.state = {
      comment: "",
      logger,
    };
  }
  newcommentClick() {
    var reputation = this.props.userinfo.reputation;
    var alertmessage = "";
    if (reputation < 0) {
      alertmessage += "\n You need at least 100 reputation to comment";
      logger.log(alertmessage);
      this.setState(logger);
      setTimeout(()=>{
        logger.log("");
        this.setState(logger);
      },2000)
    }
    else{
      this.props.setcomment(
        <div>
          <NewComment
            setcomment={this.props.setcomment}
            userinfo={this.props.userinfo}
            item={this.props.item}
          />
        </div>
      );
    }
   
  }
  render() {
    return (
      <div>
        <div className="alertbox">
          {this.state.logger.show()}
          </div>
        <div>
          <h3
            className="comment"
            onClick={this.newcommentClick}
            title="Use comments to ask for more information or suggest improvements. Avoid answering questions in comments."
          >
            Add a comment
          </h3>
        </div>
      </div>
    );
  }
}
