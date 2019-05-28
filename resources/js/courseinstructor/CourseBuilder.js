import React, {Component} from 'react'
import CourseInfo from './CourseInfo'
import Navbar from './Navbar'
import Curriculum from '../curriculum/Curriculum'
import loadData from "./dataLoader"

class CourseBuilder extends Component {
   constructor(props) {
      super(props);
      // console.log(props);
      this.state = {
         display : 0
      }
      this.id =  this.getCourseId();
      // this.loadCourse();
      this.showCourseInfo = this.showCourseInfo.bind(this);
      this.showCurriculum = this.showCurriculum.bind(this);
      this.save = this.save.bind(this);
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
   save(data){
      console.log(data);
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
   }).done((data) =>{
        console.log('SUCCESS');
        this.loadCourse();
        console.log(data);
     }).fail(function (msg,var1,var2) {
        console.log(msg.responseJSON.errors);
        console.log('FAIL');
     }).always(function (msg) {
      console.log('ALWAYS');
     });
   }
   render(){
      const content = this.state.display == 0 ? <CourseInfo id={this.id}/> :
      <Curriculum id={this.id}/>;
      return (
         <div className="container-fluid border border-secondary h-100" style={{minHeight:500 + "px"}}>
         <div className="row flex-row justify-content-end" style={{minHeight:500 + "px"}}>
           <Navbar
           showCourseInfo={this.showCourseInfo}
           showCurriculum={this.showCurriculum}
           />
           {content}
         </div>
        </div>
      )
   }
}
export default CourseBuilder
