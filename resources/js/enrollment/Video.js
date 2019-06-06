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
      // src={this.props.url}
       return(<React.Fragment>
          <video className="my-2" id="content_video"
           width="100%" height="450"
           id={this.props.id}
           poster={this.props.poster}
           src={this.props.url}
           style={{objectFit: "cover"}}
           controls>
       </video>
    </React.Fragment>)
   }
}
export default Video
