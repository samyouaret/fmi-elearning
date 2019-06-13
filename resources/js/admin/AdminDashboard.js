import React, {Component} from 'react'

import request from '../helpers/request.js'
import Loading from '../components/Loading.js'
import Dialog from '../components/Dialog.js'
import Form from '../formcomponents/Form'
import Input from '../formcomponents/Input'
import DataProvider from '../providers/DataProvider'
import DataPager from '../providers/DataPager'
import Row from './Row'

// FIXME: bug null is converted as string "null"
// TODO: enhance validatoin (not accurate)

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
           <div className="row">
             <div className="col-md-6">
                <h4>users</h4>
                <DataPager url="/admin/users" searchUrl="/admin/search/user">
                   {(users,loadMore,hasNext,search)=>{
                      // console.log(hasNext);
                      let btn = null;
                      if (hasNext) {
                        console.log("has next");
                        btn = <button className="btn btn-info my-2" onClick={loadMore}>load</button>
                     }
                     let userList =  users.map(function(user) {
                        return(<Row key={user.id} title={user.first_name + " " + user.last_name}
                        subTitle={user.email}>
                        <button className="btn btn-primary btn-sm mr-1">set as admin</button>
                        <button className="btn btn-secondary btn-sm mr-1">set as instructor</button>
                        <button className="btn btn-danger btn-sm">block</button>
                     </Row>)
                  });
                  return (<ul className="list-group">
                  <input className="form-control my-2" type="search" placeholder="search user"
                     onChange={(e)=>{
                        search(event.target.value)
                     }}/>
                     {userList}
                     {btn}
                  </ul>)
               }}
            </DataPager>
             </div>
             <div className="col-md-6">
                 <h4>published courses</h4>
                <DataPager url="/admin/courses" searchUrl="/admin/search/course">
                   {(courses,loadMore,hasNext,search)=>{
                      // console.log(hasNext);
                      let btn = null;
                      if (hasNext) {
                        console.log("has next");
                        btn = <button className="btn btn-info" onClick={loadMore}>load</button>
                     }
                     let courseList =  courses.map(function(course) {
                        return(<Row key={course.id} title={course.title}
                        subTitle={course.created_at}>
                        <button className="btn btn-primary btn-sm mr-1">unpublish</button>
                        <a href={"/enrollment/" + course.id}
                           className="btn btn-secondary btn-sm mr-1">view</a>
                     </Row>)
                  });
                  return (<ul className="list-group">
                  <input className="form-control my-2" type="search" placeholder="search user"
                     onChange={(e)=>{
                        search(event.target.value)
                     }}/>
                  {courseList}
                     {btn}
                  </ul>)
               }}
            </DataPager>
             </div>
     </div>)
    }
}
export default AdminDashboard
