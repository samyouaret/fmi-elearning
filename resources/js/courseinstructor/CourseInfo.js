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
import findByAttr from '../helpers/findByAttr.js'

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
          url : "/instructor/courseinfo/"  + this.props.id,
          method:"GET",
          contentType: 'application/json',
      };
      this.handleSubjectChange = (e)=>{
         request('/instructor/subSubjects/'+ e.target.value,{},'GET').then((data)=>{
            this.setState({
               sub_subjects : data,
               course : {
                  ...this.state.course,
                  subject_id : data[0].subject_id
               }
            })
         });
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
         }).fail((message)=>{
            let errors = message.responseJSON.errors || message.responseJSON.message;
              this.setState({
                 errors : errors
              })
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
      console.log(this.state.sub_subjects);
      console.log(this.state.languages);
      console.log(data.sub_subject_id);
      console.log("------------");
      let labelPos = findByAttr(this.state.sub_subjects,"subject_id",data.subject_id);
      let lanPos = findByAttr(this.state.languages,'id',data.language_id);
      data.label = this.state.sub_subjects[labelPos].label;
      data.sub_subject_id = this.state.sub_subjects[labelPos].id;
      data.language_name = this.state.languages[lanPos].language_name;
      let {subject_id,language_name,label,...values} = data;
      // let {cover_image,...values} = data;
      let course =  {
             ...values,
             title : data.title,
             subject_id : subject_id,
             language_name : language_name,
             label : label,
             sub_subject_id :data.sub_subject_id,
      }
      delete course.cover_image;
      request('/instructor/' + this.props.id,values,'PUT').done((message)=>{
         course.image = message.cover_image || course.image
      this.setState({
         errors : message.message,
         course : course
      })
   }).fail((message)=> {
      console.log("failed");
      console.log(message);
      course.image = message.cover_image || course.image
      let errors = message.responseJSON.errors || message.responseJSON.message;
        this.setState({
           errors : errors
        })
     })
     delete data.cover_image;
   }
   cancel(){
      this.setState({
         editing : false,
         errors : {}
      });
   }
   renderForm(){
      let fullData = this.state;
       var {course,subjects,sub_subjects,languages} = fullData;
       let message  =null;
      if (this.state.errors.message) {
         let className  = this.state.errors.status == "success" ? "alert my-2 alert-success" :
         "alert my-2 alert-danger";
         message  = (<div className={className}>{this.state.errors.message}</div>)
      }
      return (
         <div className="card-body">
            {message}
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
                  <Select defaultValue= {values.subject_id} name="subject_id"
                     onChange={(e)=>{this.handleSubjectChange(e);handleChange(e)}}
                  data={subjects} keys={{value : "label"}}/>
                  {errors.subject_id && this.renderErrors(errors.subject_id)}
               </div>
               <div className="form-group">
                <Select defaultValue= {values.sub_subject_id} name="sub_subject_id" {...handlers}
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
        <div className="card col-sm-8"  style={{minHeight:500 + "px"}}>
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
