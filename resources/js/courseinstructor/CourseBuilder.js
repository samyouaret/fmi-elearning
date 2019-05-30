import React, {Component} from 'react'
import CourseInfo from './CourseInfo'
import Navbar from './Navbar'
import Curriculum from '../curriculum/Curriculum'
import loadData from "./dataLoader"
import request from '../helpers/request.js'

class CourseBuilder extends Component {
   constructor(props) {
      super(props);
      // console.log(props);
      this.state = {
         display : 0
      }
      this.id =  this.getCourseId();
      this.showCourseInfo = this.showCourseInfo.bind(this);
      this.showCurriculum = this.showCurriculum.bind(this);
   }
   // componentDidMount will not work because id conditional rendering
   getCourseId(){
    return location.pathname.split("/")[2];
   }
   showCourseInfo(){
      this.setState({
         display : 0
      });
   }
   showCurriculum(){
      this.setState({
         display : 1
      });
   }
   render(){
      const content = this.state.display == 0 ? <CourseInfo id={this.id}/> :
      <Curriculum id={this.id}/>;
      return (
         <div className="container-fluid border border-secondary h-100" style={{minHeight:500 + "px"}}>
         <div className="row flex-row justify-content-end" style={{minHeight:500 + "px"}}>
           <Navbar
           showCourseInfo={this.showCourseInfo}
           showCurriculum={this.showCurriculum}
           publish={this.publish}
           />
           {content}
         </div>
        </div>
      )
   }
}
export default CourseBuilder
