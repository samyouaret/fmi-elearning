import React, {Component} from 'react'
import request from '../helpers/request.js'
import Dialog from '../components/Dialog.js'
import Sidebar from '../components/Sidebar'
import Video from './Video'
import Chapter from './Chapter'
import WrapperContent from '../components/WrapperContent'
import shapeChapters from '../helpers/shapeChapters'
import VideoPlayer from '../helpers/VideoPlayer'
import findByAttr from '../helpers/findByAttr'
import shortenString from '../helpers/shortenString'
import DataProvider from '../providers/DataProvider'

class EnrollmentDashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         current_content :  {
            video_url :null
         },
         chapters : [],
         resources : [],
         relatedCourses : [],
         instructor :{},
         activeLink : -1,
      }
      this.options = {
         url:  "/enrollment/course/" + this.getCourseId()
      }
      this.loadVideo = (content)=>{
        this.setState({
           current_content : content,
           activeLink : content.content_id
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
            content_id : content.content_id,
            course_id :  this.getCourseId()
         }
         request("/enrollment/enrollcontent/" + content.content_id,
         data,"POST").done((message)=>{
            content.watched = message.watched
            this.updateChapters(content);
         })
      }
      this.updateChapters = (content)=>{
         let pos = -1;
         let chapters = this.state.chapters.map((chapter,index)=>{
            pos = findByAttr(chapter.contents,'content_id',content.content_id);
            if (pos > -1) {
              chapter.contents.splice(pos,1,content);
            }
            return chapter;
         });
        this.setState({
           chapters : chapters
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
      return this.state.chapters.map((chapter)=>{
         return (<Chapter key={chapter.chapter_id}
            id={chapter.chapter_id}
            activeLink={this.state.activeLink}
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
         return ( <a className="nav-link p-2"
         style={{color: "#362e4e",
          textDecoration: "none",
          backgroundColor: "#f0f5f9"}}
         key={resource.id} target="_blank"
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
      let content_title = <h5 className="p-3 bg-light rounded">{this.state.current_content.content_title}</h5>;
      return (
         <div className="row justify-content-end" style={{minHeight:500 + "px"}}>
            <div className="container rounded border justify-content-between d-flex bg-white p-4 mb-3">
               <h4>{this.state.course_title}</h4>
               {this.state.current_content.content_title && content_title}

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
                        cover_image : data.cover_image,
                        description : data.description,
                        instructor : data.instructor
                     })
                  }}
               >
               {this.renderChapters()}
             </DataProvider>
             </Sidebar>
             <WrapperContent>
                <Video poster={cover_image}
                   id="video" url={this.state.current_content.video_url}/>
                   <div className="container bg-white rounded border p-4 mb-3">
                        <div className="row">
                           <div className="col-md-3">
                           <h4 className="my-1">instructor : </h4>
                              <a  className="bg-white align-items-center d-flex
                                 flex-column t p-3 my-2 text-secondary"
                                style={{textDecoration:"none"}} href={"/profile/" +
                                this.state.instructor.id}>
                              <img
                                style={{maxWidth:"100px",borderRadius:'50%'}} src={"/storage/profile_image/"+
                                this.state.instructor.profile_image}/>
                             <strong className="text-center">{this.state.instructor.first_name + " " +
                                this.state.instructor.last_name}</strong>
                             </a>
                         </div>
                       <div className="col-md-9 text-center">
                          {this.renderFiles()}
                       </div>
                    </div>
                    <div className="container">
                         <h3>Course description</h3>
                         {shortenString(this.state.description,500)}
                       </div>
                   </div>
                  <h5 className="card-title">Related courses</h5>
                   {this.rendeRelatedCourses()}
             </WrapperContent>
         </div>
      )
   }
}
export default EnrollmentDashboard
