import React,{Component} from "react"

export default class Navbar extends Component {
   constructor(props){
      super(props);
   }
   showCourseInfo(){
      this.props.showCourseInfo();
   }
   showCurriculum(){
      this.props.showCurriculum();
   }
   render(){
      return (
        <div className="nav bg-light col-sm-4 border-right  flex-column align-items-baseline"  style={{flex:1}}>
           <a href="#" className="nav-item nav-link" onClick={this.props.showCourseInfo}>course information</a>
           <a href="#" className="nav-item nav-link" onClick={this.props.showCurriculum}>Curriculum</a>
           <a href="#" className="nav-item nav-link">
          </a>
        </div>
      )
   }
}
