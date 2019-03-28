import React, {Component} from 'react'
import CourseInfo from './CourseInfo'
import Navbar from './Navbar'
import Curriculum from './Curriculum'
import loadData from "./dataLoader"

class CourseBuilder extends Component {
   constructor(props) {
      super(props);
      console.log(props);
      this.state = {
         display : 0
      }
      this.loadCourse();
      this.showCourseInfo = this.showCourseInfo.bind(this);
      this.showCurriculum = this.showCurriculum.bind(this);
      this.save = this.save.bind(this);
      this.updateParentData = this.updateParentData.bind(this);
   }
   // componentDidMount will not work because id conditional rendering
   loadCourse(){
      const id = this.getCourseId();
      $.getJSON('/instructor/'+ id,null,(data,textStatus,jqxhr)=> {
         this.setState({
               data : data
            });
      });
   }
   loadSubSubjects(){
      console.log(this.props);
      $.getJSON('/instructor/subSubjects/'+ this.props.subject_id,null,(data,textStatus,jqxhr)=> {
         this.setState({
               sub_subjects : data
            });
      });
   }
   loadSubjects(){
      console.log(this.props);
      $.getJSON('/instructor/subjects',null,(data,textStatus,jqxhr)=> {
         this.setState({
               subjects : data
            });
      });
   }
   getCourseId(){
    return location.pathname.split("/")[2];
   }
   showCourseInfo(){
      this.setState({
         display : 0
      });
   }
   showCurriculum(){
      this.setState({
         display : 1
      });
   }
   // updateData({key,value}){
   //    this.setState({
   //    });
   // }
   save(data){
      $.ajaxSetup({
         headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
         }
      });
      $.ajax({
      type: 'PUT',
      url: '/instructor/' + this.state.data.id,
      contentType: 'application/json',
      data: JSON.stringify(data)
   }).done(function (data) {
        console.log('SUCCESS');
        console.log(data);
     }).fail(function (msg) {
      console.log('FAIL');
     }).always(function (msg) {
      console.log('ALWAYS');
     });
      this.setState({
         data : {...this.state.data,...data}
      })
   }
   updateParentData(key,value){
     if (this.state.key) {
        this.setState({
           [key] : value
        });
     }
   }
   render(){
      console.log(this.state);
      const content = this.state.display == 0 ? <CourseInfo data={this.state.data} save={this.save}
      updateParentData={this.updateParentData}/> : <Curriculum/>;
      return (
         <div className="container-fluid border border-secondary h-100" style={{minHeight:500 + "px"}}>
         <div className="row flex-row justify-content-end" style={{minHeight:500 + "px"}}>
           <Navbar showCourseInfo = {this.showCourseInfo}
           showCurriculum={this.showCurriculum}/>
           {this.state && this.state.data && content}
         </div>
        </div>
      )
   }
}
export default CourseBuilder
