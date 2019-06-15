import React, {Component} from 'react'

import Course from './Course'
import request from '../helpers/request.js'
import Loading from '../components/Loading.js'
import DataPager from '../providers/DataPager'
import ListGroup from '../components/ListGroup'
import ListGroupRow from '../components/ListGroupRow'

// FIXME: bug null is converted as string "null"
// TODO: enhance validatoin (not accurate)

class LoggedDashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
    renderCourses(courses){
         // <button className="btn btn-primary btn-sm mr-1">unpublish</button>
         return courses.map(function(course) {
            return(<ListGroupRow key={course.id} image={"storage/course_image/"+course.cover_image}
               title={course.title}
            subTitle={course.created_at}>
            <a target="_blank" href={"/enrollment/" + course.id}
               className="btn btn-secondary btn-sm mr-1">view</a>
         </ListGroupRow>)
      });
    }
   render(){
      return(<DataPager url="/dashboard/enrolledcourses">
                         {(courses,loadMore,hasNext,search,filter)=>{
                            let btn = null;
                            if (hasNext) {
                              btn = <button className="btn btn-secondary my-2" onClick={loadMore}>load</button>
                           }
                           let courseList =  this.renderCourses(courses);
                        return (<ListGroup>
                        {courseList}
                           {btn}
                        </ListGroup>)
                     }}
         </DataPager>)
   }
}
export default LoggedDashboard
