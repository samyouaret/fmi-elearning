import React, {Component} from 'react'

import request from '../helpers/request.js'
import Loading from '../components/Loading.js'
import Dialog from '../components/Dialog.js'
import Form from '../formcomponents/Form'
import Input from '../formcomponents/Input'
import DataProvider from '../providers/DataProvider'
import DataPager from '../providers/DataPager'
import ListGroup from '../components/ListGroup'
import ListGroupRow from '../components/ListGroupRow'

// FIXME: bug null is converted as string "null"
// TODO: enhance validatoin (not accurate)

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
           subject_value : null,
           sub_subject_value : null,
           subject_id : 0,
           hasMessage : false,
        }
        this.authorizeUser = (id,type)=>{
           let url = "/admin/users/authorize/"+ id + "/" + type;
           request(url,{},"PUT").done((message)=>{
             this.setState({
               message:message.message || message,
               hasMessage  :true
            })
          }).fail((jqXHR)=>{
             let message = jqXHR.responseJSON;
             this.setState({
                message: message.errors || message.message || message,
                hasMessage  :true
             })
        })
        this.timerMessage();
       }
       this.selectSubject = (id)=>{
          this.setState({
             subject_id : id
          })
       }
        this.deleteSubject = (id)=>{
           let url = "/admin/deletesubject/"+ id;
           request(url,{},"DELETE").done((message)=>{
             this.setState({
               message:message.message || message,
               hasMessage : true
            })
          }).fail((jqXHR)=>{
             let message = jqXHR.responseJSON;
             this.setState({
                message: message.errors || message.message || message,
                 hasMessage : true
             })
        })
        this.timerMessage();
       }
        this.addSubject = (subject)=>{
           let url = "/admin/addsubject";
           request(url,{subject},"POST").done((message)=>{
             this.setState({
               message:message.message || message,
                hasMessage : true
            })
          }).fail((jqXHR)=>{
             let message = jqXHR.responseJSON;
             this.setState({
                message: message.errors || message.message || message,
                 hasMessage : true
             })
        })
        this.timerMessage();
       }
        this.addSubSubject = ()=>{
           let data = {
             subject_id : this.state.subject_id,
             sub_subject : this.state.sub_subject_value
          }
           let url = "/admin/addsubsubject";
           request(url,data,"POST").done((message)=>{
             this.setState({
               message:message.message || message,
               hasMessage : true
            })
          }).fail((jqXHR)=>{
             let message = jqXHR.responseJSON;
             this.setState({
                message: message.errors || message.message || message,
                hasMessage : true
             })
        })
        this.timerMessage();
       }
    }
    renderUsers(users){
      return users.map((user)=>{
         return(<ListGroupRow key={user.id} title={user.first_name + " " + user.last_name}
         subTitle={user.email}>
         <button className="btn btn-primary btn-sm mr-1"
            onClick={this.authorizeUser.bind(this,user.id,2)}>set as admin</button>
         <button className="btn btn-secondary btn-sm mr-1"
            onClick={this.authorizeUser.bind(this,user.id,1)}>set as instructor</button>
         <button onClick={this.authorizeUser.bind(this,user.id,0)}
            className="btn btn-danger btn-sm">delete roles</button>
      </ListGroupRow>)
   });
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
   rendersubjects(subjects){
      console.log(subjects);
      let active = "";
      return subjects.map((subject) =>{
         active ="";
         if (subject.id==this.state.subject_id) {
            active = "active"
         }
         return(<ListGroupRow key={subject.id} title={subject.label}
            active={active} onClick={this.selectSubject.bind(this,subject.id)}>
            <button onClick={this.deleteSubject.bind(this,subject.id)}
               className="btn btn-danger btn-sm">delete</button>
         </ListGroupRow>)
   });
   }
   renderSubSubjects(subSubjects){
      console.log(subSubjects);
      return subSubjects.map((sub_subject) =>{
         return(<ListGroupRow key={sub_subject.sub_id} title={sub_subject.sub_label}
            subTitle={sub_subject.label}
            ></ListGroupRow>)
   });
   }
   renderMessage(){
      return this.state.hasMessage ?
      <div className="alert alert-info w-100">{this.state.message}</div> :null;
   }
   timerMessage(){
      setTimeout(()=>{
         this.setState({
            hasMessage :false
         })
      }, 5000);
   }
    render() {
        return (
           <React.Fragment>
           {this.renderMessage()}
           <div className="row">
             <div className="col-md-6">
                <h4>users</h4>
                <DataPager url="/admin/users" searchUrl="/admin/search/user">
                   {(users,loadMore,hasNext,search,filter)=>{
                      let btn = null;
                      if (hasNext) {
                        console.log("has next");
                        btn = <button className="btn btn-info my-2" onClick={loadMore}>load</button>
                     }
                     let userList =  this.renderUsers(users);
                  return (<ListGroup>
                  <input className="form-control my-2" type="search" placeholder="filter user"
                     onChange={(e)=>{
                        filter({attr : "email",value : event.target.value});
                     }}/>
                     {userList}
                     {btn}
                  </ListGroup>)
               }}
            </DataPager>
             </div>
             <div className="col-md-6">
                 <h4>published courses</h4>
                <DataPager url="/admin/courses" searchUrl="/admin/search/course">
                   {(courses,loadMore,hasNext,search,filter)=>{
                      let btn = null;
                      if (hasNext) {
                        console.log("has next");
                        btn = <button className="btn btn-info" onClick={loadMore}>load</button>
                     }
                     let courseList =  this.renderCourses(courses);
                  return (<ListGroup>
                  <input className="form-control my-2" type="search" placeholder="search course"
                     onChange={(e)=>{
                        filter({attr : "title",value : event.target.value})
                     }}/>
                  {courseList}
                     {btn}
                  </ListGroup>)
               }}
            </DataPager>
             </div>
             <div className="col-md-6">
                 <h4>subjects</h4>
                <DataPager url="/admin/subjects" searchUrl="/admin/search/subjec">
                   {(subjects,loadMore,hasNext,search,filter,reset)=>{
                      let btn = null;
                      if (hasNext) {
                        console.log("has next");
                        btn = <button className="btn btn-info" onClick={loadMore}>load</button>
                     }
                     let addBtn = null;
                      if (subjects.length==0) {
                        console.log("has next");
                        addBtn = <button className="btn btn-secondary" onClick={(e)=>{
                              let subject = this.state.subject_value;
                              console.log(subject);
                              this.addSubject(subject);
                              setTimeout(reset,1000);
                              }}>add
                        </button>
                     }
                     let subjectList =  this.rendersubjects(subjects);
                  return (<ListGroup>
                  <input className="form-control my-2" type="search" placeholder="search subject"
                     onChange={(e)=>{
                        loadMore()
                        filter({attr : "label",value : event.target.value})
                        this.setState({
                           subject_value : event.target.value
                        })
                     }}/>
                  {subjectList}
                     {btn}
                     {addBtn}
                  </ListGroup>)
               }}
            </DataPager>
             </div>
             <div className="col-md-6">
                 <h4>sub subjects</h4>
                <DataPager url="/admin/subsubjects">
                   {(subSubjects,loadMore,hasNext,search,filter,reset)=>{
                      let btn = null;
                      if (hasNext) {
                        console.log("has next");
                        btn = <button className="btn btn-info" onClick={loadMore}>load</button>
                     }
                     let addBtn = null;
                     if (subSubjects.length==0) {
                       console.log("has next");
                       addBtn = <button className="btn btn-secondary" onClick={(e)=>{
                             let value = this.state.sub_subject_value;
                             if (this.state.subject_id>0) {
                                this.addSubSubject(value)
                                setTimeout(reset,1000);
                             }else {
                                this.setState({
                                   hasMessage:true,
                                   message : "please select a subject from subject list"
                                })
                             }
                             }}>add
                       </button>
                    }
                    let subSubjectList =  this.renderSubSubjects(subSubjects);
                  return (<ListGroup>
                  <input className="form-control my-2" type="search" placeholder="search sub subject"
                     onChange={(e)=>{
                        loadMore()
                        filter({attr : "sub_label",value : event.target.value})
                        this.setState({
                           sub_subject_value : event.target.value
                        })
                     }}/>
                  {subSubjectList}
                     {btn}
                     {addBtn}
                  </ListGroup>)
               }}
            </DataPager>
             </div>
     </div>
  </React.Fragment>)
    }
}
export default AdminDashboard
