import React, {Component} from 'react'
import shortenString from '../helpers/shortenString'
import levelsList from '../helpers/levels'
import findByAttr from '../helpers/findByAttr'

class Course extends Component {
  render(){
     let  course = this.props.data;
     let level = levelsList[findByAttr(levelsList,'id',course.level)].value;
    return (
     <div className="col-sm-6 col-md-4 my-2">
     <a className="text-dark" style={{textDecoration:"none"}} href={"/enrollment/" + course.id}>
     <div className="card">
      <div className="card-body">
         <h4 className="card-title">
            {course.title}
         </h4>
      <img className="card-img my-1" src={"/storage/course_image/" + course.cover_image}
         alt="course image"/>
      <span className="badge badge-secondary badge-pill m-1 text-white">{level}</span>
      <p>{shortenString(course.description,80)}</p>
      <span className="badge badge-info m-1 p-2 text-white">{course.course_fee} $</span>
      </div>
     </div>
     </a>
   </div>
    );
  }
}
export default Course
