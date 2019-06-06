import React, {Component} from 'react'
import request from '../helpers/request.js'
import Dialog from '../components/Dialog.js'
import Sidebar from '../components/Sidebar'
import Video from './Video'
import Chapter from './Chapter'
import WrapperContent from '../components/WrapperContent'
import shapeChapters from '../helpers/shapeChapters'
import VideoPlayer from '../helpers/VideoPlayer'
import shortenString from '../helpers/shortenString'
import DataProvider from '../providers/DataProvider'

class EnrollmentDashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         current_content :  {
            video_url :null
         },
         resources : [],
         relatedCourses : [],
      }
      this.options = {
         url:  "/enrollment/course/" + this.getCourseId()
      }
      this.loadVideo = (content)=>{
        this.setState({
           current_content : content
        })
        if (!content.watched) {
           this.videoPlayer.watch(this.watch);
        }
        this.loadResources(content.content_id);
      };
      this.watch = ()=>{
         this.recordVideoView();
         // this.videoPlayer.removeWatch(this.watch);
      }
      this.recordVideoView = ()=>{
         let content = this.state.current_content;
         let data = {
            content_id : content.content_id
         }
         request("/enrollment/enrollcontent/" + content.content_id,
         data,"POST").done((message)=>{
            content.watched = message.watched
         })
      }
      this.loadResources = (id)=>{
         request("/curriculum/content/resources/" + id,{},"GET").done((message)=>{
             this.setState({
                resources : message
             })
         })
      }
      this.getRelatedCourses = ()=>{
         request("/enrollment/relatedcourses/" + this.getCourseId(),null,"GET").done((message)=>{
             this.setState({
                relatedCourses : message
             })
         })
      }
      this.getRelatedCourses();
   }
   componentDidMount(){
      this.videoPlayer = new VideoPlayer(document.getElementById('video'));
      console.log(this.videoPlayer);
   }
   getCourseId(){
    return location.pathname.split("/")[2];
   }
   renderChapters(){
      let chapters = this.state.chapters || [];
      return chapters.map((chapter)=>{
         return (<Chapter key={chapter.chapter_id}
            loadVideo={this.loadVideo}
            title={chapter.chapter_title} contents={chapter.contents}/>)
      })
   }
   getResourceName(url){
     if (!url) {
         return "undefined resource";
     }
     url = url.split("/")[3];
     return url.length < 50 ? url : url.substr(0,50) + "...";
   }
   renderFiles(){
      if (this.state.resources.length ==0) {
         return <span>no files are found.</span>
      }
      const files =  this.state.resources.map((resource)=>{
         return ( <a className="nav-link" key={resource.id} target="_blank"
         href={resource.url}>{this.getResourceName(resource.url)}</a>)
      });
      return (<div className="nav flex-column nav-pills">
         <h5>Files: </h5>
         {files}
       </div>)
   }
   rendeRelatedCourses(){
      if (this.state.relatedCourses.length ==0) {
          return <span>no related posts are found.</span>
      }
      const courses =  this.state.relatedCourses.map((course)=>{
         return (<div className="card w-sm-12" key={course.id}
            style={{maxHeight:" 12rem",maxWidth:" 12rem"}}>
                <a href={"/enrollment/" + course.id} className="text-dark"
                   style={{textDecoration:"none"}}>
                <img src={"/storage/course_image/" + course.cover_image}  style={{maxHeight:"6rem"}}
                   className="card-img-top"/>
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                </div>
                </a>
              </div>)
      });
     return (<div className="card-deck my-3">
         {courses}
       </div>)
   }
   render(){
      let cover_image = this.state.current_content.video_url ? null :
      "/storage/course_image/" + this.state.cover_image;
      return (
         <div className="row justify-content-end" style={{minHeight:500 + "px"}}>
            <div className="container justify-content-between d-flex bg-white p-4 mb-3">
               <h4 className="text-muted">{this.state.course_title}</h4>
               <h5>{this.state.current_content.content_title}</h5>
            </div>
             <Sidebar>
              <DataProvider options={this.options}
                 renderLoading={this.renderLoading}
                  renderError={(error)=>{
                      return (<div className="alert alert-danger">{error.message}</div>)
                  }}
                  onSuccess={(data)=>{
                     let chapters  = shapeChapters(data.chapters);
                     this.setState({
                        chapters : chapters,
                        course_title : data.course_title,
                        cover_image : data.cover_image
                     })
                  }}
               >
               {this.renderChapters()}
             </DataProvider>
             </Sidebar>
             <WrapperContent>
                <Video poster={cover_image}
                   id="video" url={this.state.current_content.video_url}/>
                   <div className="container justify-content-between d-flex bg-white p-4 mb-3">
                      <h4 className="text-muted">instructor</h4>
                     {this.renderFiles()}
                   </div>
                  <h5 className="card-title">Related courses</h5>
                   {this.rendeRelatedCourses()}
             </WrapperContent>
         </div>
      )
   }
}
export default EnrollmentDashboard
