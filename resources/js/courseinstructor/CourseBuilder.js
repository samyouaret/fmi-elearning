import React, {Component} from 'react'
import CourseInfo from './CourseInfo'
import Navbar from './Navbar'
import Curriculum from '../curriculum/Curriculum'
import loadData from "./dataLoader"
import request from '../helpers/request.js'
import Dialog from '../components/Dialog.js'

class CourseBuilder extends Component {
   constructor(props) {
      super(props);
      // console.log(props);
      this.state = {
         display : 0,
        displayDialog : false,
        dialogData :{}
      }
      this.id =  this.getCourseId();
      this.showCourseInfo = this.showCourseInfo.bind(this);
      this.showCurriculum = this.showCurriculum.bind(this);
   }
   // componentDidMount will not work because id conditional rendering
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
   toggleDialog(bool,dialogData){
      this.setState({
        displayDialog :bool,
        dialogData:{
           ...this.state.dialogData,
           ...dialogData
        }
      })
      if (bool) {
         setTimeout(()=>{
            this.setState({
               displayDialog :false
            })
         }, 2000);
      }
   }
   renderDialog(){
      return this.state.displayDialog ?
      <Dialog  dismiss={this.toggleDialog.bind(this,false,{})}
         {...this.state.dialogData}></Dialog> : null;
   }
   render(){
      let boundFunc = this.toggleDialog.bind(this);
      const content = this.state.display == 0 ?
      <CourseInfo id={this.id} toggleDialog={boundFunc}/> :
      <Curriculum id={this.id} toggleDialog={boundFunc}/>;
      return (
         <div className="container-fluid border border-secondary h-100" style={{minHeight:500 + "px"}}>
         <div className="row flex-row justify-content-end" style={{minHeight:500 + "px"}}>
           <Navbar
           showCourseInfo={this.showCourseInfo}
           showCurriculum={this.showCurriculum}
           publish={this.publish}
           />
           {content}
         </div>
         {this.renderDialog()}
        </div>
      )
   }
}
export default CourseBuilder
