import React,{Component} from "react"
import request from '../helpers/request.js'
import findByAttr from '../helpers/findByAttr.js'

export default class Chapter extends Component {
   constructor(props){
      super(props);
      this.state = {
         activeLink  : -1,
      }
   }
   renderVideoLinks(){
      let contents = this.props.contents || [];
      return contents.map((content) =>{
         return (<a
            onClick={()=>{this.props.loadVideo(content.video_url)}}
            key={content.content_id}
            className="list-group-item list-group-item-action">{content.content_title}</a>);
      })
   }

   render(){
      return (
         <div className="card mb-2">
            <div className="card-header">
             {this.props.title}
            </div>
            <ul className="list-group list-group-flush bg-light">
           {this.renderVideoLinks()}
           </ul>
        </div>
      )
   }

}
