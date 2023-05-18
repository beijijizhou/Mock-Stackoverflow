import React, { Component } from "react";
import Form from "./Form.js";
import Main from "./Main.js";
import axios from "axios";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.askclick = this.askclick.bind(this);
    this.signinclick = this.signinclick.bind(this);
  }
  askclick() {
    axios
    .post("http://localhost:8000/loadNewUserInfo", this.props.userinfo)
    .then((newuserinfo) =>{
      axios.post("http://localhost:8000/reloadForm",this.props.userinfo).then(()=>{
        this.props.setcontent(
          <Form setcontent={this.props.setcontent} userinfo={newuserinfo.data}/>
        );
      })
    })
   
   
  }
  signinclick(){
    axios.post("http://localhost:8000/logout", this.props.userinfo).then(() => {
      this.props.setwholepage(<Main />);
    });
   
  }
  render() {
    return (
      <div id="header">
        <div>
          {this.props.length} {this.props.left}
          {this.props.view&&<div> {this.props.view+" "}{this.props.view=== 1 ? "View" : "Views"}</div>}
        </div>
        <div>{this.props.mid}</div>
       { this.props.userinfo?<div className="button" onClick={this.askclick}>
          Ask A Question{" "}
        </div>:
        <div className="button" onClick={this.signinclick}>
        Sign In{" "}
      </div>
        
        }
        
      </div>
    );
  }
}

