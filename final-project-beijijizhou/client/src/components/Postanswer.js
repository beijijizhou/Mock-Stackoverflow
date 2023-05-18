import React, { Component } from "react";
import Answerpage from "./Answerpage";
import axios from "axios";
import UserProfile from "./UserProfile";
import UserAnswer from "./UserAnswer";
export default class Postanswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text||"",
      error: "",
    };
    this.handlePostAnswer = this.handlePostAnswer.bind(this);
  }
  addAnswer(question, answer) {
    var item = {
      question: question,
      answer: answer,
      id: this.props.userinfo._id,
      edit:this.props.edit,
      aid:this.props.item._id
    };
    
   if (this.props.edit){
    axios.post("http://localhost:8000/editAnswer", item).then((res) => {
      axios
      .post("http://localhost:8000/loadUserAnswer", this.props.userinfo)
      .then((res) => {
        this.props.setUserContent(
          <UserAnswer
          userinfo={this.props.userinfo}
          userdata={res.data}
            setcontent={this.props.setcontent}
            setUserContent={this.props.setUserContent}
          />
        );
      });
    })
   }
   else{
    axios.post("http://localhost:8000/addAnswer", item).then((res) => {
      axios
        .post("http://localhost:8000/updateView", question)
        .then((res) => {
          this.props.setcontent(
            <Answerpage
              data={this.props.data}
              setcontent={this.props.setcontent}
              item={res.data}
              userinfo={this.props.userinfo}
            />
          );
        });
    });
   }
   
  }
  handlePostAnswer() {
    var text = this.state.text;
    var alertmessage = "";
    var f = false;
    if (text.length === 0) {
      alertmessage += "\nText shoud not be empty";
      f = true;
    }
    this.setState({
      error: alertmessage,
    });
    if (!f) {
      var answers = {
        text: text,
        ansBy: this.props.userinfo.username,
      };
      this.addAnswer(this.props.item, answers);
    }
  }
  render() {
    return (
      <div>
        <div className="alertbox">{this.state.error}</div>
        <h2>Answer Text</h2>
        <textarea
          id="answertextbox"
          className="box"
          placeholder="Be respestful"
          defaultValue={this.props.text}
          onChange={(e) => {
            this.setState({ text: e.target.value });
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              this.handlePostAnswer();
            }
          }}
        ></textarea>
        <div className="button" id="postbutton" onClick={this.handlePostAnswer}>
          Post answer
        </div>
      </div>
    );
  }
}
