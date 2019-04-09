import React,{Component} from "react"
import loadData from "./dataLoader"
import Form from '../FormComponents/Form'
import Input from '../FormComponents/Input'
import Select from '../FormComponents/Select'
import levelsList from './levels'
import DataProvider from '../providers/DataProvider'

export default class CourseInfo extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : false
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
   // static getDerivedStateFromProps(nextProps, prevState) {
   //       return {data : nextProps.data};
   // }
   validate(values){
      let errors={}
      if (!values.title) {
         console.log(Boolean(values.title));
         console.log(values.title.length);
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
   save(data){
      this.props.save(data);
      this.cancel();
   }
   cancel(){
      this.setState({
         editing : false
      });
   }
   renderForm({course,subjects,sub_subjects,languages},error,refersh){
      return (
         <div className="card-body">
            <Form
              initialValues={course}
              onSubmit={({subject_id,...values},errors)=>{
                 this.save(values);
              }}
              validateOnChange={false}
             validate={this.validate}
            >
           { ({values,handleChange,handleBlur,handleSubmit,errors,touched}) => {
             const handlers = {
                onChange : handleChange,
                onBlur : handleBlur
             }
           return  (
                <form onSubmit={handleSubmit}>
               <div className="form-group">
                <Input name="title" value={values.title} {...handlers}/>
                {errors.title && touched.title &&
                 (<small className="invalid-feedback d-inline-block">{errors.title}</small>)
                 }
               </div>
               <div className="form-group">
                <textarea  rows="7" className="form-control" name="description" value={values.description} {...handlers}/>
               </div>
               <div className="form-group">
                  <Select defaultValue= {values.subject_id} name="subject_id" {...handlers}
                  data={subjects} keys={{value : "label"}}/>
               </div>
               <div className="form-group">
                <Select defaultValue= {values.sub_subject_id} name="sub_subject_id" {...handlers}
                data={sub_subjects} keys={{value : "label"}}/>
               </div>
               <div className="form-group">
                <Select  defaultValue= {values.language_id} name="language_id" {...handlers}
                data={languages} keys={{value:"language_name"}}/>
               </div>
               <div className="form-group">
                <Select  defaultValue= {values.level} name="level" {...handlers}
                data={levelsList}/>
               </div>
               <div className="form-group">
                  <label>Price</label>
                <Input  name="course_fee" value={values.course_fee} {...handlers}/>
               </div>
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
       <div className="card-body">
        <h3 className="card-title">{course.title}</h3>
        <small className="badge pill-badge badge-light">{course.language_name}</small>
        <small className="badge pill-badge badge-secondary ml-2">{course.label}</small>
        <p> {course.description} </p>
        <button className="btn btn-primary" onClick={this.edit}>edit</button>
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
        <div className="card col-8"  style={{minHeight:500 + "px"}}>
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
            {(result,error,refersh)=>{
              return this.state.editing ? this.renderForm(result,error,refersh) :
              this.renderDisplay(result.course);
            }}
         </DataProvider>
        </div>
      )
   }
}
