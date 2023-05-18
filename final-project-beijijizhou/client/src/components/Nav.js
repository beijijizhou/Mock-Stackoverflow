import React, { Component } from "react";
import axios from "axios";
import Data from "./Data";
import Tags from "./Tags";
import Header from "./Header";
import FiveDiv from "./FiveQuestions";
import UserProfile from "./UserProfile.js";
import Main from "./Main";
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
    this.QuestionClick = this.QuestionClick.bind(this);
    this.TagClick = this.TagClick.bind(this);
    this.profileClick = this.profileClick.bind(this);
    this.logOutClick = this.logOutClick.bind(this);
  }
  logOutClick() {
    axios.post("http://localhost:8000/logout", this.props.userinfo).then(() => {
      this.props.setwholepage(<Main />);
    });
  }
  profileClick() {
    axios
      .post("http://localhost:8000/loadNewUserInfo", this.props.userinfo)
      .then((newuserinfo) => {
        axios
          .post("http://localhost:8000/loadUserQuestion", newuserinfo.data)
          .then((res) => {
            this.props.setcontent(
              <UserProfile
                userinfo={newuserinfo.data}
                userdata={res.data}
                setcontent={this.props.setcontent}
              />
            );
          });
      });
  }
  search(input) {
    axios.post("http://localhost:8000/loadQuestions").then((res) => {
      var indexset = new Set();
      var text = input.split(" ");
      var index = 0;
      for (let onequestion of res.data) {
        var set = new Set();
        var questiontext = onequestion.text.split(" ");
        var questiontitle = onequestion.title.split(" ");
        for (let j of questiontext) {
          var s = j.toLocaleLowerCase();
          set.add(s);
        }
        for (let j of questiontitle) {
          s = j.toLocaleLowerCase();
          set.add(s);
        }
        for (let k of text) {
          if (set.has(k.toLocaleLowerCase())) {
            indexset.add(index);
            break;
          } else if (k.charAt(0) === "[" && k.charAt(k.length - 1) === "]") {
            k = k.substring(1, k.length - 1).toLocaleLowerCase();
            for (let tag of onequestion.tags) {
              if (tag.name.toLocaleLowerCase() === k) {
                indexset.add(index);
              }
            }
          }
        }
        index++;
      }
      var searchresult = [];
      for (let index of indexset) {
        searchresult.push(index);
      }
      var question = searchresult.length === 1 ? "Question" : "Questions";
      console.log(searchresult);
      if (searchresult.length > 0) {
        this.props.setcontent(
          <div>
            <Header
              length={searchresult.length}
              setcontent={this.props.setcontent}
              left={question}
              userinfo={this.props.userinfo}
              mid={"Search Result"}
            />
            <FiveDiv
              data={res.data}
              setcontent={this.props.setcontent}
              questionlist={searchresult}
              userinfo={this.props.userinfo}
            ></FiveDiv>
          </div>
        );
      } else {
        this.props.setcontent(
          <div>
            <Header
              length={searchresult.length}
              setcontent={this.props.setcontent}
              left={"Questions"}
              mid={"Search Result"}
              userinfo={this.props.userinfo}
            />
            <h1 id="noq">No Questions Found</h1>
          </div>
        );
      }
    });
  }
  QuestionClick() {
    var page = {
      page: "QuestionPage",
    };
    axios
      .post("http://localhost:8000/loadNewUserInfo", this.props.userinfo)
      .then((newuserinfo) => {
        axios.post("http://localhost:8000/loadQuestions", page).then((res) => {
          this.props.setcontent(
            <Data
              data={res.data}
              handleTitleClick={this.handleTitleClick}
              setcontent={this.props.setcontent}
              userinfo={newuserinfo.data}
              setwholepage={this.props.setwholepage}
            />
          );
        });
      });
  }

  TagClick() {
    var page = {
      page: "TagPage",
    };
    axios
    .post("http://localhost:8000/loadNewUserInfo", this.props.userinfo)
    .then((newuserinfo) => {
      axios.post("http://localhost:8000/loadQuestions", page).then((res) => {
        this.props.setcontent(
          <Tags
            data={res.data}
            handleTitleClick={this.handleTitleClick}
            setcontent={this.props.setcontent}
            userinfo={newuserinfo.data}
            setwholepage={this.props.setwholepage}
          />
        );
      });
    })
    
  }
  render() {
    return (
      <div className="sticky">
        <div className="nav" id="nav">
          <div className="BannerDiv" tabIndex="1" onClick={this.QuestionClick}>
            Questions
          </div>
          <div className="BannerDiv" tabIndex="1" onClick={this.TagClick}>
            Tags
          </div>
          <h1>Fake Stack Overflow</h1>
          <div>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  this.search(this.state.search);
                }
              }}
              className="box"
              onChange={(e) => {
                this.setState({ search: e.target.value });
              }}
            ></input>
          </div>

          {this.props.userinfo == null ? (
            <div>Guest User</div>
          ) : (
            <div className="ProfileLogout">
              <div
               
                tabIndex="1"
                className="BannerDiv"
                onClick={this.profileClick}
              >
                {this.props.userinfo.username}
              </div>
              <div
                tabIndex="1"
                className="BannerDiv"
                onClick={this.logOutClick}
              >
                Log out
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
