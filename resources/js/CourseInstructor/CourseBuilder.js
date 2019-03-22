import React, {Component} from 'react'

import Course from './Course'

class CourseBuilder extends Component {
   constructor(props) {
      super(props);
      this.state = {
         course : {}
      }
      // this.updateCourses =  this.updateCourses.bind(this);
      this.loadCourse();
   }
   loadCourse(data){
      let setState = this.setState.bind(this);
      const id = this.getCourseId();
      console.log(id);
      $.getJSON('/instructor/'+ id,null,function(data,textStatus,jqxhr){
         setState({
            courses : data[0]
         });
      });
   }
   getCourseId(){
    return location.pathname.split("/")[2];
   }
   render(){
      return (
         <div className="card-group card-deck">
          "hello"
         </div>
      )
   }
}
export default CourseBuilder
