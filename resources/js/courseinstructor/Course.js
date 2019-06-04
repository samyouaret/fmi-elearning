import React, {Component} from 'react'
import shortenString from '../helpers/shortenString.js'

class Course extends Component {
  render(){
     let  course = this.props.data;
     let style = {fontSize: 13 +"px"};
     let statusContent = course.is_published== 0 ?
       <span style={style} className="badge badge-warning badge-pill m-1 text-gray"> draft</span> :
       <span style={style} className="badge badge-success badge-pill m-1 text-white"> published</span>
      console.log(course.cover_image)
    return (
     <div className="col-sm-4 my-2">
     <div className="card">
      <div className="card-body">
      <img className="card-img-top" src={"/storage/course_image/" + course.cover_image}
         alt="course image"/>
      <h3 className="card-title">
      {course.title}
      {statusContent}
      </h3>
       <p>{shortenString(course.description,80)}</p>
       <a className="btn btn-secondary" href={"/instructor/" + course.id  + "/edit"}>explore</a>
      </div>
     </div>
   </div>
    );
  }
}
export default Course
