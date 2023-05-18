import React, { Component } from "react";
import Answerpage from "./Answerpage";
import axios from "axios";
import EditAndDetele from "./EditAndDetele";
export default class Onequestion extends Component {
  constructor(props) {
    super(props);
    this.titleclick = this.titleclick.bind(this);
  }

  titleclick() {
    axios
      .post("http://localhost:8000/updateView", this.props.item)
      .then((res) => {
        this.props.setcontent(
          <Answerpage
            data={this.props.data}
            setcontent={this.props.setcontent}
            item={res.data}
            userinfo={this.props.userinfo}
            setwholepage={this.props.setwholepage}
          />
        );
      });
  }
  fourtagsdiv(onetag) {
    return <li key={onetag}>{onetag}</li>;
  }
  render() {
    var view = this.props.item.views === 1 ? "View" : "Views";
    var answers = this.props.item.answers.length === 1 ? "Answer" : "Answers";
    var date = new Date(this.props.item.askedAt).toString();
    var hr = date.split(" ")[4];
    var day =
      date.split(" ")[1] + " " + date.split(" ")[2] + ", " + date.split(" ")[3];
    hr = hr.split(":")[0] + ":" + hr.split(":")[1];
    var vote = this.props.item.votes;
    var summary = this.props.item.summary;
    return (
      <div className="dataDiv">
        <div className="leftDiv">
          <div>{vote} Votes</div>
          <div>
            {this.props.item.views} {view}
          </div>
          <div>
            {this.props.item.answers.length} {answers}
          </div>
        </div>
        <div className="midDiv">
          <div className="titleDiv" onClick={this.titleclick}>
            {this.props.item.title}
          </div>
          <div className="summary">{summary}</div>
          <div className="tagDiv">
            {this.props.item.tags.map((id) => this.fourtagsdiv(id.name))}
          </div>
          {this.props.editmode==="question" && (
            <EditAndDetele
              item={this.props.item}
              userinfo={this.props.userinfo}
              setcontent={this.props.setcontent}
              setUserContent={this.props.setUserContent}
              editmode="question"
            />
          )}
        </div>
        <div className="rightDiv">
          <li>
            Asked by <span className="askedBy">{this.props.item.asked_by}</span>
          </li>
          <div>
            On <span className="askedOn">{day}</span>
          </div>
          <div>
            At <span className="askedAt">{hr}</span>
          </div>
        </div>
      </div>
    );
  }
}
