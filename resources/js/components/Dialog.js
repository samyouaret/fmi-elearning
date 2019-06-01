import React, { Component } from 'react';

export default class Dialog extends Component {
   constructor(props){
      super(props);
      // display must be handled by parent Component
      this.state = {
         title : this.props.title || "",
         subTitle : this.props.subTitle || "",
         body  : this.props.body || "",
         type : this.props.type|| "message"
      }
   }
  getMessageImage(){
      let image = "/storage/images/";
      let type = this.state.type;
      if (type!="success" && type!="error" && type!="warning") {
         type = "message";
      }
      return image + type +".png";
   }
  render() {
     return (
        <div className="toast w-100" style={{
             position:"fixed",
             top:50 + "%",
             left:50 +"%",
             opacity: 1,
             zIndex: 99999,
             transform: "translate(-50%,-50%)"
           }} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <img style={{width:24 +"px"}} src={this.getMessageImage()} className="rounded mr-2" alt="..."/>
            <strong className="mr-auto">{this.state.title}</strong>
            <small>{this.state.subTitle}</small>
            <button type="button" className="ml-2 mb-1 close" onClick={this.props.dismiss}
               aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body">
           {this.state.body}
          </div>
        </div>
    )
  }
}
