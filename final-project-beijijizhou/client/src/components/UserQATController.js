import React, { Component } from "react";
import UserQATButton from "./UserQATButton";
import UserQuestion from "./UserQuestion";
export default class UserQATController extends Component {
  constructor(props) {
    super(props);
    this.setUserContent = this.setUserContent.bind(this);
    this.state = {
      QATdisplay: <div></div>,
    };
  }
  setUserContent(UserContent) {
    this.setState({
      QATdisplay: UserContent,
    });
  }
  componentDidMount(){
    this.setState({
      QATdisplay: <UserQuestion
      userinfo={this.props.userinfo}
      userdata={this.props.userdata}
      setUserContent={this.setUserContent}
      setcontent={this.props.setcontent}
    />
    });
  }
  render() {
    
    return (
      <div className="UserProfile">
        <UserQATButton
          userinfo={this.props.userinfo}
          userdata={this.props.userdata}
          setUserContent={this.setUserContent}
          setcontent={this.props.setcontent}
        />
        
        {this.state.QATdisplay}
        {/* {user.questions && <NoneParticition para={"answered any questions"}/>} */}
      </div>
    );
  }
}
