import React from "react";
import axios from "axios";
import Nav from "./Nav";
import Data from "./Data";
import Tags from "./Tags";
import UserProfile from "./UserProfile";
import Answerpage from "./Answerpage";
import Form from "./Form";
export default class FakeStackOverflow extends React.Component {
  constructor(props) {
    super(props);
    this.setcontent = this.setcontent.bind(this);
    this.state = {
      navbar: (
        <Nav
          setcontent={this.setcontent}
          userinfo={this.props.userinfo}
          setwholepage={this.props.setwholepage}
        />
      ),
      content: <div></div>
    };
  }
  setcontent(newcontent) {
    this.setState({ content: newcontent });
  }
  componentDidMount() {
    var page;
    switch (this.props.page) {
      case "TagPage":
        page = {
          page: "TagPage",
        };
        axios.post("http://localhost:8000/loadQuestions", page).then((res) => {
          this.setState({
            content: (
              <Tags
                data={res.data}
                handleTitleClick={this.handleTitleClick}
                setcontent={this.setcontent}
                userinfo={this.props.userinfo}
                setwholepage={this.props.setwholepage}
              />
            ),
          });
        });
        break;
      case"Form":
      
        axios.post("http://localhost:8000/reloadForm",this.props.userinfo).then(()=>{
          this.setcontent(
            <Form setcontent={this.setcontent} userinfo={this.props.userinfo}/>
          );
        })
      
      
      break;
      case "UserQuestion":
        if(this.props.userinfo!==undefined){
          axios.post("http://localhost:8000/loadUserQuestion", this.props.userinfo).then((res) => {
            this.setState({
              content: (
                <UserProfile
                  userdata={res.data}
                  handleTitleClick={this.handleTitleClick}
                  setcontent={this.setcontent}
                  userinfo={this.props.userinfo}
                  setwholepage={this.props.setwholepage}
                />
              ),
            });
          });
        }
       
        break;
      case "AnswerPage":
        axios.post("http://localhost:8000/loadQuestions").then(allquestion=>{
          axios.get("http://localhost:8000/reloadAnswerPage").then((res)=>{
            this.setState({
              content:
              <Answerpage
              item={res.data}
              data={allquestion.data}
              handleTitleClick={this.handleTitleClick}
              setcontent={this.setcontent}
              userinfo={this.props.userinfo}
              setwholepage={this.props.setwholepage}
              />
            })
           })
        })
       
        break;
      default: {
        page = {
          page: "QuestionPage",
        };
        axios.post("http://localhost:8000/loadQuestions", page).then((res) => {
          this.setState({
            content: (
              <Data
                data={res.data}
                handleTitleClick={this.handleTitleClick}
                setcontent={this.setcontent}
                userinfo={this.props.userinfo}
                setwholepage={this.props.setwholepage}
              />
            ),
          });
        });
      }
    }
  }
  render() {
    return (
      <div>
        {this.state.navbar}
        {this.state.content}
      </div>
    );
  }
}
