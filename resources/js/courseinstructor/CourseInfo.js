import React,{Component} from "react"
import loadData from "./dataLoader"
import Form from '../formcomponents/Form'
import Input from '../formcomponents/Input'
import Select from '../formcomponents/Select'
import levelsList from './levels'
import DataProvider from '../providers/DataProvider'
import FileInput from '../providers/FileInput'
import request from '../helpers/request.js'
import Loading from '../components/Loading.js'
import Dialog from '../components/Dialog.js'
import findByAttr from '../helpers/findByAttr.js'

// TODO: fix bug unauthenticated routes errors

export default class CourseInfo extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : false,
         errors : {},
         data : null,
      }
      this.edit = this.edit.bind(this);
      this.cancel = this.cancel.bind(this);
      this.save = this.save.bind(this);
    this.options =
      {
          url : "/instructor/course/"  + this.props.id,
          method:"GET",
          contentType: 'application/json',
      };
      this.handleSubjectChange = (e)=>{
         let value = e.target.value;
         request('/instructor/subSubjects/'+ value,{},'GET').done((data)=>{
            let pos = findByAttr(data,"subject_id",value);
            this.setState({
               sub_subjects : data,
               course : {
                  ...this.state.course,
                  subject_id :value,
                  sub_subject_id : data[pos].id
               }
            })
         });
      }
      this.handleSubSubjectChange = (e)=>{
         let value = e.target.value;
            this.setState({
               course : {
                  ...this.state.course,
                  sub_subject_id : value
               }
            })
      }
      this.publish = ()=>{
         request('/instructor/'+ this.props.id,{},
         'POST').then((message)=>{
            this.setState({
               course : {
                  ...this.state.course,
                  is_published : 1
               }
            })
           this.showDialog(message,"success");
         }).fail((jqXHR)=>{
            let message = jqXHR.responseJSON;
            this.showDialog(message,"error");
         });
      }
      this.unpublish = ()=>{
         request('/instructor/unpublish/'+ this.props.id,{},
         'PUT').then((message)=>{
            this.setState({
               course : {
                  ...this.state.course,
                  is_published :0
               }
            })
            this.showDialog(message,"warning");
         }).fail((jqXHR)=>{
            let message = jqXHR.responseJSON;
            this.showDialog(message,"error");
         });
      }
   }
   // static getDerivedStateFromProps(nextProps, prevState) {
   //       return {data : nextProps.data};
   // }
   validate(values){
      let errors={}
      if (!values.title) {
         errors.title =" title is Required.";
      }
      else if (values.title.length > 60) {
         errors.title =" title length can't be greater than 60";
      }
      return errors;
   }
   renderErrors(errors){
      return (<small className="invalid-feedback d-inline-block">
       { errors.map(function(elem) {
          return elem;
        })
        }
      </small>)
   }
   save(data,errors){
      let subject_id = this.state.course.subject_id;
      let sub_subject_id = this.state.course.sub_subject_id;
      data.sub_subject_id = sub_subject_id;
      request('/instructor/' + this.props.id,data,'PUT').done((message)=>{
      let labelPos = findByAttr(this.state.sub_subjects,"id",sub_subject_id);
      let lanPos = findByAttr(this.state.languages,'id',data.language_id);
      let label = this.state.sub_subjects[labelPos].label;
      let language_name = this.state.languages[lanPos].language_name;
      let course =  {
             ...data,
             language_name : language_name,
             label : label,
             image : message.cover_image || this.state.course.image
      }
      delete course.cover_image;
      this.setState({
         course : course
      })
      this.showDialog(message,"success");
   }).fail(({responseJSON})=> {
      if (responseJSON.errors) {
         this.setState({
            errors : responseJSON.errors
         })
      }else {
         this.showDialog(responseJSON,"error");
      }
     })
   }
   showDialog(message,type){
      console.log(message);
      this.props.toggleDialog(true,{
         title : message.status,
         body : message.message,
         type : type
      })
   }
   cancel(){
      this.setState({
         editing : false,
         errors : {}
      });
   }
   renderForm(){
      let fullData = this.state;
       var {subjects,sub_subjects,languages} = fullData;
       let course  = {
          course_fee : fullData.course.course_fee,
          title : fullData.course.title,
          description : fullData.course.description,
          language_id : fullData.course.language_id,
          level : fullData.course.level,
          // for error reporting puropse only code is not handling the change of it
          sub_subject_id : fullData.course.sub_subject_id,
       }
      return (
         <div className="card-body">
            <Form
               initialErrors={this.state.errors}
              initialValues={course}
              onSubmit={this.save}
             // validate={this.validate}
            >
           { ({values,handleChange,handleBlur,handleSubmit,errors,touched}) => {
             const handlers = {
                onChange : handleChange,
                onBlur : handleBlur
             }
           return  (
                <form onSubmit={handleSubmit} encType='x-www-url-formurlencoded'>
               <div className="form-group">
                <Input name="title" value={values.title} {...handlers}/>
                {errors.title && this.renderErrors(errors.title)}
               </div>
               <div className="form-group">
                <textarea  rows="7" className="form-control" name="description" value={values.description} {...handlers}/>
                {errors.description && this.renderErrors(errors.description)}
               </div>
               <div className="form-group">
                  <Select defaultValue= {this.state.course.subject_id} name="subject_id"
                     onChange={this.handleSubjectChange}
                  data={subjects} keys={{value : "label"}}/>
               </div>
               <div className="form-group">
                <Select defaultValue= {this.state.course.sub_subject_id} name="sub_subject_id"
                   onChange={this.handleSubSubjectChange}
                data={sub_subjects} keys={{value : "label"}}/>
                {errors.sub_subject_id && this.renderErrors(errors.sub_subject_id)}
               </div>
               <div className="form-group">
                <Select  defaultValue= {values.language_id} name="language_id" {...handlers}
                data={languages} keys={{value:"language_name"}}/>
                {errors.language_id && this.renderErrors(errors.language_id)}
               </div>
               <div className="form-group">
                <Select  defaultValue= {values.level} name="level" {...handlers}
                data={levelsList}/>
                {errors.level && this.renderErrors(errors.level)}
               </div>
               <div className="form-group">
                  <label>Price</label>
                <Input  name="course_fee" value={values.course_fee} {...handlers}/>
                {errors.course_fee && this.renderErrors(errors.course_fee)}
               </div>
               <FileInput name="cover_image" error={errors.cover_image} {...handlers}>
                  {errors.cover_image && this.renderErrors(errors.cover_image)}
               </FileInput>
               <button className="btn btn-success mr-3" type="submit">save</button>
               <button className="btn btn-danger" onClick={this.cancel}>cancel</button>
            </form>
            )
         }
        }
       </Form>
   </div>)
   }
   renderDisplay(){
      let course = this.state.course;
      let publishButton = null;
      let publishedStatus = null;
      if (course.is_published==0) {
         publishButton = <button className="btn btn-warning" onClick={this.publish}>publish</button>;
      }else {
         publishButton = <button className="btn btn-warning" onClick={this.unpublish}>unpublish</button>;
         publishedStatus =  <small className="badge pill-badge badge-success mr-2">published</small>
      }
      return(
         <div>
         <img className="card-img" src={"/storage/course_image/" + course.image}/>
         <div className="card-body">
        <h3 className="card-title">{course.title}</h3>
        <small className="badge pill-badge badge-light mr-2">{course.language_name}</small>
        <small className="badge pill-badge badge-secondary mr-2">{course.label}</small>
        {publishedStatus}
        <p> {course.description} </p>
        <button className="btn btn-primary mr-2" onClick={this.edit}>edit</button>
        {publishButton}
        </div>
      </div>
      )
   }
   edit(){
      this.setState({
         editing :true
      })
   }
   render(){
      return (
        <div className="card col-sm-8 position-relative"  style={{minHeight:500 + "px"}}>
           <DataProvider options={this.options}
                renderLoading={()=>{ return <Loading/>}}
                renderError={(error)=>{
                   return (<div className="alert alert-danger">{error.message}</div>)
                }}
                onSuccess={(data)=>{
                   this.setState({
                      data : data,
                      course : data.course,
                      subjects : data.subjects,
                      sub_subjects : data.sub_subjects,
                      languages : data.languages
                   })
                }}
                onError={(error)=>{
                   this.setState({
                      error : error
                   })
                }}
                >
                {(result)=>{
                   return this.state.editing ? this.renderForm() :
                   this.renderDisplay();
                }}
         </DataProvider>
        </div>
      )
   }
}
// {content}
