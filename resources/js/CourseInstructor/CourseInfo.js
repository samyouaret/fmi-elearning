import React,{Component} from "react"
import loadData from "./dataLoader"

export default class CourseInfo extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : false
      }
      // this.renderForm = this.renderForm.bind(this);
      this.edit = this.edit.bind(this);
      this.cancel = this.cancel.bind(this);
      this.save = this.save.bind(this);
      this.handleSubjectChange= this.handleSubjectChange.bind(this);
      this.handleChange= this.handleChange.bind(this);
      // this.loadSubSubjects();
      $.when(loadData('/instructor/subSubjects/'+ this.props.data.subject_id),
        loadData('/instructor/subjects'),loadData('/instructor/languages'))
        .then((sub_subjects, subjects,languages) => {
           this.setState({
            sub_subjects : sub_subjects[0],
            subjects : subjects[0],
            languages : languages[0]
         })
    });
   }
   handleSubjectChange(e){
      loadData('/instructor/subSubjects/'+ e.target.value).then((data)=>{
         console.log(data);
         this.setState({
          sub_subjects : data,
          sub_subject_id : data[0].id
       })
      });
   }
   handleChange(event{
      event.persist();
     this.setState({
      [event.target.name] : event.target.value
     });
   }
   save(){
      var {languages,subjects,sub_subjects,editing,...data} = this.state;
      this.props.save(data);
      this.cancel();
   }
   cancel(){
      this.setState({
         editing : false
      });
   }
   renderSelectList(arr,{key='id',value,compare}){
      return arr.map((ele)=> {
         let selected ="";
         if (compare===ele[key]) {
            console.log(ele[key]);
            selected = "selected";
         }
       return <option key={ele[key]} selected value={ele[key]}>{ele[value]}</option>
      })
   }
   renderForm(){
      const subjects = this.renderSelectList(this.state.subjects,{
         value  :'label',
         key:'id',
         compare : this.props.data.subject_id,
      });
      const sub_subjects = this.renderSelectList(this.state.sub_subjects,{
         value  :'label',
         key:'id',
         compare : this.props.data.sub_subject_id,
      });
      const languages = this.renderSelectList(this.state.languages,{
         value  :'language_name',
         key:'id',
         compare : this.props.data.sub_subject_id,
      });
      const levels = this.renderSelectList(
         [
          {
           id : 1,
           value : 'beginner',
          },
          {
           id : 2,
           value : 'intermediate',
          },
          {
           id : 3,
           value : 'advanced',
          }
       ],{
         value  :'value',
         key:'id',
         compare : this.props.data.level,
      });
      return (
         <div className="card-body">
         <form onSubmit={this.save}>
            <div className="form-group">
             <input  className="form-control" name="title" defaultValue={this.props.data.title} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
             <textarea  rows="7" className="form-control" name="description" defaultValue={this.props.data.description} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
             <select  defaultValue= {this.props.data.subject_id} className="form-control" name="subject_id"  onChange={this.handleSubjectChange}>
                {subjects}
             </select>
            </div>
            <div className="form-group">
             <select defaultValue= {this.props.data.sub_subject_id} className="form-control" name="sub_subject_id" onChange={this.handleChange}>
               {sub_subjects}
             </select>
            </div>
            <div className="form-group">
             <select  defaultValue= {this.props.data.language_id} className="form-control" name="language_id" onChange={this.handleChange}>
               {languages}
             </select>
            </div>
            <div className="form-group">
             <select  defaultValue= {this.props.data.level} className="form-control" name="level" onChange={this.handleChange}>
               {levels}
             </select>
            </div>
            <div className="form-group">
               <label>Price</label>
             <input  className="form-control" name="course_fee" defaultValue={this.props.data.course_fee} onChange={this.handleChange}/>
            </div>
            <button className="btn btn-success mr-3" onClick={this.save}>save</button>
            <button className="btn btn-danger" onClick={this.cancel}>cancel</button>
         </form>
      </div>
      )
   }
   renderDisplay(){
      console.log(this.state.subjects);
      return (
       <div className="card-body">
        <h3 className="card-title">{this.props.data.title}</h3>
        <small className="badge pill-badge badge-light">{this.props.data.label}</small>
        <small className="badge pill-badge badge-secondary ml-2">{this.props.data.language_name}</small>
        <p> {this.props.data.description} </p>
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
      let content = null;
      if (this.state.editing) {
         content =  this.renderForm();
      }else {
         content =  this.renderDisplay();
      }
      return (
        <div className="card col-8"  style={{minHeight:500 + "px"}}>
            {content}
        </div>
      )
   }
}
