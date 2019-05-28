import React,{Component} from "react"
import Form from '../formcomponents/Form'
import Input from '../formcomponents/Input'
import Select from '../formcomponents/Select'
import FileInput from '../providers/FileInput'
import Content from './Content'
import ResourceList from './ResourceList'

export default class Chapter extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : false,
         title  : this.props.title || "",
         id : this.props.id,
         contents  : this.props.contents || {},
         newContent : false
      }
     this.addNewContent = ()=>{
        this.setState({
           contents :[
             ...this.state.contents,
             {
              content_id :this.randomInteger(),
              content_title : "an example content title"
             }
          ]
        })
     };
     this.editTitle = ()=>{
        this.setState({
           editing : true
        })
     };
     this.cancel = ()=>{
        this.setState({
           editing : false
        })
     };
     this.handleChange = (e)=>{
       let target = e.target.name;
       this.setState({
          [target.name] : target.value
       })
     };
   }

   renderContents(){
      return this.state.contents.map((content) =>{
         return (<Content key={content.content_id}
            delete = {this.deleteContent.bind(this,content.content_id)}
            update = {this.updateContent.bind(this)}
            data={content}/>);
      })
   }

   deleteContent(id){
      let pos  = this.findContentById(id);
      this.state.contents.splice(pos,1);
      this.setState({
         contents : this.state.contents
      })
   }
   updateContent(id,content){
      let pos  = this.findContentById(id);
      this.state.contents[pos] = content;
      this.setState({
         contents : this.state.contents
      })
   }

   findContentById(id){
      let pos = -1;
      for (var i = 0; i < this.state.contents.length; i++) {
         if (this.state.contents[i].content_id ==id) {
            pos = i;
            break;
         }
      }
      return pos;
   }

   randomInteger(){
      return Math.floor(Math.random() * 10000)
   }

   renderTitleForm(){
      return (
         <span>
         <input className="form-control" defaultValue={this.state.title} name='title'
            onChange={this.handleChange}/>
         <button className="btn btn-primary m-2 btn-sm"
         onClick={this.save}>save</button>
         <button className="btn btn-danger btn-sm"
         onClick={this.cancel}>cancel</button>
      </span>
      )
   }

   render(){
      const title = this.state.editing ? this.renderTitleForm() :
      (<span className="d-flex">
         <span className="mr-auto">{this.state.title}</span>
       <button className="btn btn-secondary btn-sm align-self-end"
       onClick={this.editTitle}>edit</button>
      </span>
      );
      return (
       <div className="card mt-2">
          <div className="card-header">
           {title}
          </div>
          <ul className="list-group list-group-flush bg-light">
         {this.renderContents()}
         </ul>
         <button className="btn btn-light btn-sm mt-3 align-self-end"
            onClick={this.addNewContent}>+ new content</button>
      </div>
      )
      // <div className="container">
      //  <div className="row">
      //     <div className="col-sm-6 mb-1">
      //        <ResourceList list={[{id:1,url:"/source/test/video.mp4"}]} title="video"/>
      //      </div>
      //     <div className="col-sm-6">
      //        <ResourceList list={[{id:1,url:"/source/test/filename.pdf"},
      //          {id:2,url:"/source/test/filename2.pdf"}]} title="uploaded files"/>
      //     </div>
      //  </div>
      // </div>
   }

}
