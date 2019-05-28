import React,{Component} from "react"
import loadData from "./dataLoader"
import Form from '../formcomponents/Form'
import Input from '../formcomponents/Input'
import Select from '../formcomponents/Select'
import levelsList from './levels'
import DataProvider from '../providers/DataProvider'
import FileInput from '../providers/FileInput'

export default class CourseInfo extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : false,
         errors : {}
      }
      this.edit = this.edit.bind(this);
      this.cancel = this.cancel.bind(this);
      this.save = this.save.bind(this);
      this.handleSubjectChange= this.handleSubjectChange.bind(this);
    this.options =
      {
          url : "/instructor/courseinfo/"  + this.props.id,
          method:"GET",
          contentType: 'application/json',
      };
   }
   findAttrById(arr,id,attr){
      for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
               return arr[i][attr]
            }
         }
         return null;
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
   handleSubjectChange(e,handleChange){
      loadData('/instructor/subSubjects/'+ e.target.value).then((data)=>{
         this.setState({
          sub_subjects : data,
          sub_subject_id : data[0].id
       })
      });
   }
   renderErrors(errors){
      return (<small className="invalid-feedback d-inline-block">
       { errors.map(function(elem) {
          return elem;
        })
        }
      </small>)
   }
   save(data){
      console.log(data);
      $.ajaxSetup({
         headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
         }
      });
      var form_data = new FormData();
      for ( var key in data ) {
          form_data.append(key,data[key]);
      }
      form_data.append('_method','PUT');
      $.ajax({
      type: 'POST',
      url: '/instructor/' + this.props.id,
      contentType: false,
      processData: false,
      data: form_data
   }).done((message)=>{
      console.log(data);
      this.setState({
         errors : message
      })
   }).fail((msg)=> {
      console.log("failed");
      console.log(msg);
      let errors = msg.responseJSON.errors || msg.responseJSON;
        this.setState({
           errors : errors
        })
     })
     // this.cancel();
   }
   cancel(){
      this.setState({
         editing : false
      });
   }
   renderForm(fullData,error,reload,update){
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
              onSubmit={(data,errors)=>{
                  let {subject_id,language_name,label,image,...values} = data;
                  this.save(values);
                  delete data.cover_image;
                  console.log(this.findAttrById(languages,data.language_id,'language_name'));
                  data.language_name = this.findAttrById(languages,data.language_id,'language_name');
                  data.label = this.findAttrById(sub_subjects,data.sub_subject_id,'label');
                  update({
                     data : {
                        ...fullData,
                        course : data
                     }
                  });

              }}
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
                  <Select defaultValue= {values.subject_id} name="subject_id" onChange={this.handleSubjectChange}
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
   renderDisplay(course){
      return  (
         <div>
         <img className="card-img" src={"/storage/course_image/" + course.image}/>
         <div className="card-body">
        <h3 className="card-title">{course.title}</h3>
        <small className="badge pill-badge badge-light">{course.language_name}</small>
        <small className="badge pill-badge badge-secondary ml-2">{course.label}</small>
        <p> {course.description} </p>
        <button className="btn btn-primary" onClick={this.edit}>edit</button>
        </div>
      </div>
      )
     return null;
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
                renderLoading={()=>{
                   return (<div className="d-flex justify-content-center">
                           <div className="spinner-border" role="status">
                             <span className="sr-only">Loading...</span>
                           </div>
                         </div>)
                }}
                renderError={(error)=>{
                   // this.updateError(error);
                   return (<div className="alert alert-danger">{error.message}</div>)
                }}
                Onsuccess={(data)=>{
                   this.setState({
                      data : data.course
                   })
                }}
                OnError={(error)=>{
                   this.setState({
                      error : error
                   })
                }}
                >
            {(result,error,reload,update)=>{
              return this.state.editing ? this.renderForm(result,error,reload,update) :
              this.renderDisplay(result.course);
            }}
         </DataProvider>
        </div>
      )
   }
}
