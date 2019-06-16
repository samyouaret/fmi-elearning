import React,{Component} from "react"
import request from '../helpers/request.js'
import findByAttr from '../helpers/findByAttr.js'
import ListGroup from '../components/ListGroup'
import ListGroupRow from '../components/ListGroupRow'

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
   fancyTimeFormat(time)
   {
       // Hours, minutes and seconds
       var hrs = ~~(time / 3600);
       var mins = ~~((time % 3600) / 60);
       var secs = ~~time % 60;

       // Output like "1:01" or "4:03:59" or "123:03:59"
       var ret = "";

       if (hrs > 0) {
           ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
       }

       ret += "" + mins + ":" + (secs < 10 ? "0" : "");
       ret += "" + secs;
       return ret;
   }
   renderVideoLinks(){
      let contents = this.state.contents;
      return contents.map((content) =>{
         let watched = null;
         if (content.watched) {
            // watched =   <span className="badge badge-primary badge-pill">&#128065;</span>;
            watched =   <img src="/storage/images/view.png" width="24" height="24"/>;
         }
         let active ="";
         let UniqueSum = content.content_id +""+ this.props.id;
         if (content.content_id==this.props.activeLink) {
            active = "active"
         }
         return (<ListGroupRow
            onClick={()=>{
               this.loadVideo(content)
            }}
            title={content.content_title}
            subTitle={this.fancyTimeFormat(content.time_required_in_sec)}
            key={content.content_id}
            active={active}>
          {watched}
         </ListGroupRow>);
      })
   }

   render(){
      return (
         <div className="mb-2">
            <h5 className="bg-secondary text-white p-3">
             {this.props.title}
          </h5>
            <ListGroup>
           {this.renderVideoLinks()}
           </ListGroup>
        </div>
      )
   }

}
