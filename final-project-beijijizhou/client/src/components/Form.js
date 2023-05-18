import React, { Component } from "react";
import axios from "axios";
import Data from "./Data";
import UserQuestion from "./UserQuestion";
import { Logger } from "./Logger";
let logger = new Logger();
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.handlePostClick = this.handlePostClick.bind(this);
    logger.log("");
    this.state = {
      title: this.props.title || "",
      text: this.props.text || "",
      tags: this.props.tags || "",
      summary: this.props.summary || "",
      alert:"",
      logger,
    };
  }
  add(q) {
    if (this.props.edit) {
      axios.post("http://localhost:8000/addQuestion", q).then(() => {
        axios
          .post("http://localhost:8000/loadUserQuestion", this.props.userinfo)
          .then((res) => {
            this.props.setUserContent(
              <UserQuestion
                userinfo={this.props.userinfo}
                userdata={res.data}
                setcontent={this.props.setcontent}
                setUserContent={this.props.setUserContent}
              />
            );
          });
      });
    } else {
      axios.post("http://localhost:8000/addQuestion", q).then((res) => {
        this.props.setcontent(
          <Data
            data={res.data}
            handleTitleClick={this.handleTitleClick}
            setcontent={this.props.setcontent}
            userinfo={this.props.userinfo}
          />
        );
      });
    }
  }
  handlePostClick() {
    var alertmessage = "";
    var title = this.state.title;
    var text = this.state.text;
    var tags = this.state.tags;
    var summary = this.state.summary;
    var userinfo = this.props.userinfo;
    tags = tags.trim().split(" ");
    var tagset = new Set();
    var upset = new Set();
    for (let i of tags) {
      if (i !== " " && i !== "" && !upset.has(i.toUpperCase())) {
        upset.add(i.toUpperCase());
        tagset.add(i);
      }
    }
    var f = false;
    if (title.length > 50) {
      alertmessage += "Title shoud not be more than 50 characters";
      f = true;
    } else if (title.length === 0) {
      alertmessage += "Title shoud not be empty";
      f = true;
    }
    if (text.length === 0) {
      alertmessage += "\nText shoud not be empty";
      f = true;
    }
    if (summary.length > 140) {
      alertmessage += "\nSummary shoud not be more than 140 characters";
      f = true;
    }
    else if (summary.length === 0) {
      alertmessage += "\nSummary shoud not be empty";
      f = true;
    }
   
    if (tagset.size !== 0 &&userinfo.reputation<100) {
      alertmessage += "\n A new tag name can only be created with reputation 100 or more.";
      f = true;
    }
    logger.log(alertmessage);
    this.setState({
      alert: logger.show(),
    });
    // setTimeout(() => {
    //   logger.log("");
    //   this.setState({
    //     alert: logger.show(),
    //   }
       
    //   );
    // }, 2000);
    if (!f) {
      var hours = "" + new Date().getHours() + ":" + new Date().getMinutes();
      var tagarray = [];
      for (let tag of tagset) {
        tagarray.push(tag);
      }
      var q = {
        title,
        text,
        summary,
        tags: tagarray,
        askedBy: userinfo,
        askedOn: "",
        askedAt: hours,
        answers: [],
        views: 0,
        edit: this.props.edit,
        item: this.props.item,
      };
      this.add(q);
    }
  }
  render() {
    return (
      <div>
        <div className="alertbox">{this.state.logger.show()}</div>
        <h2>Question Title</h2>
        <p>Title shoud not be more than 50 characters.</p>
        <textarea
          id="titlebox"
          className="box"
          placeholder="Come up with a good click bait"
          defaultValue={this.props.title}
          onChange={(e) => {
            this.setState({ title: e.target.value });
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              this.handlePostClick();
            }
          }}
        >
          {}
        </textarea>
        <h2>Question Summary</h2>
        <p>This is a good summary</p>
        <textarea
          id="textbox"
          className="box"
          placeholder="max. 140 characters"
          defaultValue={this.props.summary}
          onChange={(e) => {
            this.setState({ summary: e.target.value });
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              this.handlePostClick();
            }
          }}
        ></textarea>
        <h2>Question Text</h2>
        <p>Add details</p>
        <textarea
          id="textbox"
          className="box"
          placeholder="Text should be as detail as possible"
          defaultValue={this.props.text}
          onChange={(e) => {
            this.setState({ text: e.target.value });
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              this.handlePostClick();
            }
          }}
        ></textarea>
        <h2>Tags</h2>
        <p>Add Keywords separated by whitespace.</p>
        <textarea
          id="tagbox"
          className="box"
          placeholder="Add a new tag requires more than 100 reputation"
          onChange={(e) => {
            this.setState({ tags: e.target.value });
          }}
          defaultValue={this.props.tags}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              this.handlePostClick();
            }
          }}
        ></textarea>
        <div className="button" id="postbutton" onClick={this.handlePostClick}>
          Post Questions
        </div>
      </div>
    );
  }
}
