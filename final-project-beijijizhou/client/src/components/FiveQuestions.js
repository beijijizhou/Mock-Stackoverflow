import React, { Component } from 'react'
import Onequestion from './Onequestion'
export default class FiveQuestions extends Component {
    constructor(props){
        super(props)
        this.state={
          counter:0,
          range:5,
        }
        this.prevClick=this.prevClick.bind(this)
        this.nextClick=this.nextClick.bind(this)
      }
      prevClick(){
        var counter=this.state.counter
        if(counter-this.state.range>=0){
          counter-=this.state.range
          this.setState({
            counter:counter
          })
        }
      }
      nextClick(){
        var length=this.props.questionlist.length;
        var counter=this.state.counter
        if(length-counter>=this.state.range){
          counter+=this.state.range
          this.setState({
            counter:counter
          })
        }
      }
  render() {
    var start = this.state.counter;
    var end=start + this.state.range
    var data = this.props.questionlist.slice(start, end);
    var len=this.props.questionlist.length;
    return (
      <div>
       
        {data.map((index) => {
          return (
            <div key={index}>
              <Onequestion
                item={this.props.data[index]}
                setcontent={this.props.setcontent}
                data={this.props.data}
                userinfo={this.props.userinfo}
                editmode={this.props.editmode}
                setUserContent={this.props.setUserContent}
              />
            </div>
          );
        })}
         {this.props.questionlist.length>this.state.range&&<div className="PrevNext">
        {<div className="nextbutton" onClick={this.prevClick}> Prev</div>} 
         {end<len&&<div className="nextbutton" onClick={this.nextClick}> Next</div>} 
        </div>}
      </div>
    )
  }
}
