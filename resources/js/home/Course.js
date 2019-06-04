import React, {Component} from 'react'
import shortenString from '../helpers/shortenString.js'

class Course extends Component {
  render(){
     let  course = this.props.data;
    return (
     <div className="col-sm-4 my-2">
     <a className="text-dark" style={{textDecoration:"none"}} href={"/instructor/" + course.id  + "/edit"}>
     <div className="card">
      <div className="card-body">
         <h4 className="card-title">
            {course.title}
         </h4>
      <img className="card-img my-1" src={"/storage/course_image/" + course.cover_image}
         alt="course image"/>
      <p>{shortenString(course.description,80)}</p>
      </div>
     </div>
     </a>
   </div>
    );
  }
}
export default Course
