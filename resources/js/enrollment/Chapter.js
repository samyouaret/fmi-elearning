import React,{Component} from "react"
import request from '../helpers/request.js'
import findByAttr from '../helpers/findByAttr.js'

export default class Chapter extends Component {
   constructor(props){
      super(props);
      this.state = {
         activeLink  : -1,
         contents : this.props.contents || [],

      }
   }
   loadVideo(content){
      let newcontent = this.props.loadVideo(content);
      // let pos = findByAttr(this.state.contents,"content_id",content.content_id);
      // let contents = this.state.contents;
      // contents.splice(pos,1,newcontent);
      // this.setState({
      //    contents : contents
      // })
   }
   renderVideoLinks(){
      let contents = this.state.contents;
      return contents.map((content) =>{
         let watched = null;
         if (content.watched) {
            // watched =   <span className="badge badge-primary badge-pill">&#128065;</span>;
            watched =   <img src="/storage/images/view.png" width="24" height="24"/>;
         }
         return (<a
            onClick={()=>{this.loadVideo(content)}}
            key={content.content_id}
            className="list-group-item d-flex justify-content-between align-items-center
            list-group-item-action">{content.content_title}
          {watched}
         </a>);
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
