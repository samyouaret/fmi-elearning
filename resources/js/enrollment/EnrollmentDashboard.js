import React, {Component} from 'react'
import request from '../helpers/request.js'
import Dialog from '../components/Dialog.js'
import Sidebar from '../components/Sidebar'
import Video from './Video'
import Chapter from './Chapter'
import WrapperContent from '../components/WrapperContent'
import shapeChapters from '../helpers/shapeChapters'
import DataProvider from '../providers/DataProvider'

class EnrollmentDashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         current_video : null
      }
      this.options = {
         url:  "/curriculum/" + this.getCourseId()
      }
      this.loadVideo = (url)=>{
         this.setState({
            current_video : url
         })
      }
   }
   // componentDidMount will not work because id conditional rendering
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
   render(){
      return (
         <div className="row justify-content-end" style={{minHeight:500 + "px"}}>
             <Sidebar>
              <DataProvider options={this.options}
                 renderLoading={this.renderLoading}
                  renderError={(error)=>{
                      return (<div className="alert alert-danger">{error.message}</div>)
                  }}
                  onSuccess={(data)=>{
                     this.setState({
                        chapters : shapeChapters(data)
                     })
                  }}
               >
               {this.renderChapters()}
             </DataProvider>
             </Sidebar>
             <WrapperContent>
                <Video url={this.state.current_video}/>
             </WrapperContent>
         </div>
      )
   }
}
export default EnrollmentDashboard
