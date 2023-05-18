import React, { Component } from "react";
import Login from "./Login";
import FakeStackOverflow from "./fakestackoverflow";
import axios from "axios";
// import Tags from "./Tags";
// import Answerpage from "./Answerpage";
// import UserProfile from "./UserProfile";
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.setwholepage = this.setwholepage.bind(this);
    this.state = {
      content: <Login setwholepage={this.setwholepage} />,
    };
  }
  componentDidMount() {
    var guestpage=["QuestionPage", "TagPage","AnswerPage"]
    axios.get("http://localhost:8000/islogged").then((res) => {
   
      if(res.data.page===undefined){
        this.setState({
          content:<Login setwholepage={this.setwholepage} />,
        })
      }
      else if (res.data.userinfo) {
        this.setState({
          content: (
            <FakeStackOverflow
              setwholepage={this.setwholepage}
              userinfo={res.data.userinfo}
              page={res.data.page}
            />
          ),
        });
      } 
      else if (guestpage.includes(res.data.page)) {
        console.log("123")
        this.setState({
          content: (
            <FakeStackOverflow
              setwholepage={this.setwholepage}
              page={res.data.page}
            />
          ),
        });
      } 
      else {
        this.setState({
          content: <Login setwholepage={this.setwholepage} />,
        });
      }
    });
  }
  setwholepage(newpage) {
    this.setState({ content: newpage });
  }
  render() {
    return <div>{this.state.content}</div>;
  }
}
