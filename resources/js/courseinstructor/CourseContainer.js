import React, {Component} from 'react'

import Course from './Course'

class CourseContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         courses : []
      }
      // this.updateCourses =  this.updateCourses.bind(this);
      this.updateCourses();
   }
   getInitialState() {
      return {courses: []};
   }
   updateCourses(data){
      let setState = this.setState.bind(this);
      $.getJSON('/instructor/courses',null,function(data,textStatus,jqxhr){
         setState({
            courses : data
         });
      });
   }
   render(){
      const courses = this.state.courses.map(function(course) {
           return <Course key={course.id} data={course}>
           </Course>;
      });
      return (
         <div className="card-group card-deck">
         {courses}
         </div>
      )
   }
}
export default CourseContainer
