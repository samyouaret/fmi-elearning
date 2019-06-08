import React, {Component} from 'react'

import Course from './Course'
import request from '../helpers/request.js'
import Loading from '../components/Loading.js'
import Dialog from '../components/Dialog.js'
import Form from '../formcomponents/Form'
import Input from '../formcomponents/Input'
// FIXME: bug null is converted as string "null"
// TODO: enhance validatoin (not accurate)
class CourseContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         courses : [],
         errors : {},
         editing : false
      }
      // this.updateCourses =  this.updateCourses.bind(this);
      this.updateCourses();
      this.createnewCourse = (data)=>{
         request('/instructor',data,'POST').then((message)=>{
            location.href = "/instructor/" + message.id + "/edit";
            // console.log(message);
         }).fail((jqXHR)=>{
            let message = jqXHR.responseJSON;
            this.setState({
               errors: message.errors || message.message
            })
         });
      }
      this.updateEditing = (bool)=>{
         this.setState({
            editing:bool
         })
      }
     this.edit = ()=> this.updateEditing(true);
     this.cancel = ()=> this.updateEditing(false);
   }
   getInitialState() {
      return {courses: []};
   }
   renderErrors(errors){
      return (<small className="invalid-feedback d-inline-block">
       { errors.map(function(elem) {
          return elem;
        })
        }
      </small>)
   }
   renderForm(){
      return(
       <div className="card m-2"
          // style={{
          //      position:"fixed",
          //      top:50 + "%",
          //      left:50 +"%",
          //      zIndex: 99999,
          //      transform: "translate(-49%,-49%)"
          //    }}>
          >
        <div className="card-body">
          <Form
           initialErrors={this.state.errors}
           onSubmit={this.createnewCourse}
         >
        { ({values,handleChange,handleBlur,handleSubmit,errors,touched}) => {
          const handlers = {
           onChange : handleChange,
           onBlur : handleBlur
          }
        return  (
           <form onSubmit={handleSubmit}>
           <div className="form-group">
             <label htmlFor="title" style={{fontSize:"20px"}}>Title :</label>
           <Input name="title" value={values.title} {...handlers}/>
           {errors.title && this.renderErrors(errors.title)}
           </div>
           <button className="btn btn-primary btn-sm rounded-0 mr-3" type="submit">Create</button>
           <button className="btn btn-danger btn-sm rounded-0" onClick={this.cancel}>Cancel</button>
         </form>
         )
       }
      }
     </Form>
    </div>
   </div>)
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
      let form = this.state.editing ? this.renderForm() :
      <button className="btn btn-light m-2" type="submit" onClick={this.edit}>Create new course</button>;
      return (
         <React.Fragment>
         {form}
         <div className="container">
         <div className="row card-group card-deck">
            {courses}
            </div>
         </div>
      </React.Fragment>
      )
   }
}
export default CourseContainer
