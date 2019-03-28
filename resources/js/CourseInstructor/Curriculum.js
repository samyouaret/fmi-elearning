import React,{Component} from "react"

export default class Curriculum extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : false
      }
      this.renderForm = this.renderForm.bind(this);
   }
   renderForm(){
       return null;
   }
   render(){
      if (this.state.editing) {
         return this.renderForm();
      }
      return (
        <div className="card col-8"  style={{minHeight:500 + "px"}}>
            Curriculum
        </div>
      )
   }
}
