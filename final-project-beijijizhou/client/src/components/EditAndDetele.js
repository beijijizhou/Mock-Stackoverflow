import React, { Component } from "react";
import axios from "axios";
import UserQuestion from "./UserQuestion";
import Form from "./Form";
import Postanswer from "./Postanswer";
import UserAnswer from "./UserAnswer";
import UserTag from "./UserTag";
export default class EditAndDetele extends Component {
  constructor(props) {
    super(props);
    this.deleteClick = this.deleteClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.finishTagedit = this.finishTagedit.bind(this);
    this.state = {
      EditAndDetele: (
        <div className="editanddelete">
          <div className="button" id="newbutton" onClick={this.editClick}>
            Edit{" "}
          </div>
          <div className="button" id="newbutton" onClick={this.deleteClick}>
            Delete{" "}
          </div>
          <div></div>
        </div>
      ),
      newtagname: "",
      alert: "",
    };
  }
  editClick() {
    switch (this.props.editmode) {
      case "question":
        this.questionedit();
        break;
      case "answer":
        this.answeredit();
        break;
      default:
        this.tagedit();
    }
  }
  deleteClick() {
    switch (this.props.editmode) {
      case "question":
        this.questiondelete();
        break;
      case "answer":
        this.answerdelete();
        break;
      default:
        this.tagdelete();
    }
  }
  questionedit() {
    var item = this.props.item;
    var tagsarray = "";
    tagsarray = item.tags.map((tag) => tagsarray + tag.name);
    tagsarray = tagsarray.toString().replaceAll(",", " ");
    this.props.setUserContent(
      <Form
        userinfo={this.props.userinfo}
        title={item.title}
        summary={item.summary}
        text={item.text}
        tags={tagsarray}
        item={this.props.item}
        setcontent={this.props.setcontent}
        setUserContent={this.props.setUserContent}
        edit={true}
      />
    );
  }
  answeredit() {
    var item = this.props.item;
    this.props.setUserContent(
      <Postanswer
        userinfo={this.props.userinfo}
        text={item.text}
        item={this.props.item}
        setcontent={this.props.setcontent}
        edit={true}
        setUserContent={this.props.setUserContent}
      />
    );
  }
  tagedit() {
    this.setState({
      EditAndDetele: (
        <div className="tagEdit">
          <textarea
            placeholder="newtagname"
            defaultValue={this.props.name}
            onChange={(e) => {
              this.setState({ newtagname: e.target.value });
            }}
          ></textarea>
          <div></div>
          <div className="button" onClick={this.finishTagedit}>
            Finish
          </div>
        </div>
      ),
    });
  }
  finishTagedit() {
    var tags ={
      old:this.props.name,
      new:this.state.newtagname,
      userinfo:this.props.userinfo
    }
    this.donetagedit(tags)
  }
  donetagedit(tags){
    axios.post("http://localhost:8000/tagEdit", tags).then(() => {
      axios
      .post("http://localhost:8000/loadUserQuestion", this.props.userinfo)
      .then((res) => {
        this.props.setUserContent(
          <UserTag
          userinfo={this.props.userinfo}
          userdata={res.data}
            setcontent={this.props.setcontent}
            setUserContent={this.props.setUserContent}
          />
        );
      });
    });
  }
  tagdelete() {
    var tags ={
      old:this.props.name,
      new:undefined,
      userinfo:this.props.userinfo
    }
    this.donetagedit(tags)
  }
  answerdelete() {
    axios
      .post("http://localhost:8000/deleteAnswer", this.props.item)
      .then((res) => {
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
      });
  }
  questiondelete() {
    var q = {
      item: this.props.item,
      userinfo: this.props.userinfo,
    };
    axios.post("http://localhost:8000/deleteQuestion", q).then((res) => {
     
      axios
        .post("http://localhost:8000/loadUserQuestion", this.props.userinfo)
        .then((res) => {
          this.props.setUserContent(
            <div>
              <UserQuestion
                userinfo={this.props.userinfo}
                userdata={res.data}
                setcontent={this.props.setcontent}
                setUserContent={this.props.setUserContent}
              />
            </div>
          );
        });
    });
  }
  render() {
    return (
      <div>
        <div className="alertbox">{this.state.alert}</div>
        {this.state.EditAndDetele}
      </div>
    );
  }
}
