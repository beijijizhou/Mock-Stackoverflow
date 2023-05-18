import React, { Component } from "react";
import Header from "./Header";
import FiveDiv from "./FiveQuestions";
import EditAndDetele from "./EditAndDetele";
export default class Tags extends Component {
  handleOneTagClick(name) {
    var data = this.props.data;
    var questionlist = [];
    var index = 0;
    var counter = 0;
    for (let question of data) {
      for (let tags of question.tags) {
        if (name === tags.name) {
          questionlist.push(index);
          counter++;
          break;
        }
      }
      index++;
    }
    var mid = "Question Tagged [" + name + "]";
    var question = counter === 1 ? "Question" : "Questions";

    this.props.setcontent(
      <div>
        <Header
          data={this.props.data}
          length={counter}
          setcontent={this.props.setcontent}
          left={question}
          mid={mid}
          userinfo={this.props.userinfo}
          setwholepage={this.props.setwholepage}
        />
        <FiveDiv
          data={this.props.data}
          setcontent={this.props.setcontent}
          questionlist={questionlist}
          userinfo={this.props.userinfo}
        ></FiveDiv>
      </div>
    );
  }
  tagscreate(name, map) {
    var count = map.get(name) === 1 ? "question" : "questions";
    return (
      <li
        key={name}
        id="bigtag"
       
      >
        <div id="onetag"  onClick={this.handleOneTagClick.bind(this, name)}>{name}</div>
        <div id="downtag">
          {" "}
          {map.get(name)} {count}
        </div>
        <div className="tageEditAndDelete">
        {this.props.editmode !== undefined && (
          <EditAndDetele
            name={name}
            userinfo={this.props.userinfo}
            setcontent={this.props.setcontent}
            setUserContent={this.props.setUserContent}
            editmode={this.props.editmode}
          ></EditAndDetele>
        )}
        </div>
       
      </li>
    );
  }
  render() {
    var data = this.props.data;
    var tagmap = new Map();
    data.map((questions) =>
      questions.tags.map((e) =>
        !tagmap.has(e.name)
          ? tagmap.set(e.name, 1)
          : tagmap.set(e.name, tagmap.get(e.name) + 1)
      )
    );
    var tagarray = [];
    for (let tag of tagmap) {
      tagarray.push(tag[0]);
    }
    return (
      <div>
        {this.props.editmode!=="tag"&& <Header
          data={this.props.data}
          length={tagmap.size}
          setcontent={this.props.setcontent}
          left={"Tags"}
          mid={"All Tags"}
          userinfo={this.props.userinfo}
          setwholepage={this.props.setwholepage}
        />}
       
        <div id="threetags">
          {tagarray.map((e) => this.tagscreate(e, tagmap))}
        </div>
      </div>
    );
  }
}
