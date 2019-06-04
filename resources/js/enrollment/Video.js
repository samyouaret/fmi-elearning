import React, {Component} from 'react'
import Sidebar from '../components/Sidebar'
import request from '../helpers/request.js'
import Dialog from '../components/Dialog.js'

class Video extends Component {
   constructor(props) {
      super(props);
      this.state = {
         url : this.props.url || ""
      }
   }
   render(){
      return null;
       (<video className="my-2" id="content_video"
           width="100%" height="auto"
           src={this.state.url} controls>
       </video>)
   }
}
export default Video
