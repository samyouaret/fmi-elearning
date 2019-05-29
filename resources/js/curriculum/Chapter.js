import React,{Component} from "react"
import Form from '../formcomponents/Form'
import Input from '../formcomponents/Input'
import Select from '../formcomponents/Select'
import FileInput from '../providers/FileInput'
import Content from './Content'
import ResourceList from './ResourceList'
import request from '../helpers/request.js'

export default class Chapter extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : false,
         title  : this.props.title || "",
         id : this.props.id,
         contents  : this.props.contents || {},
      }

     this.addNewContent = ()=>{
        request("/curriculum/content/create/" + this.state.id,{},"POST")
       .done((message)=>{
         this.setState({
            contents :[
               ...this.state.contents,
               message.data
            ]
         })
       })
     };
     this.save = (data)=>{
        request("/curriculum/chapter/update/" + this.state.id,data,"PUT")
       .done((message)=>{
         this.setState({
            message : message.message,
            title : data.chapter_title
         })
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
    deleteContent(id){
      request("/curriculum/content/" + id,{},"DELETE")
     .done((message)=>{
        let pos  = this.findContentById(id);
        this.state.contents.splice(pos,1);
        this.setState({
           contents : this.state.contents
        })
     })
   };

   renderContents(){
      return this.state.contents.map((content) =>{
         return (<Content key={content.content_id}
            delete = {this.deleteContent.bind(this,content.content_id)}
            update = {this.updateContent.bind(this)}
            chapterId={this.props.id}
            data={content}/>);
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
      let initialValues = {
         id : this.state.id,
         chapter_title : this.state.title
      }
      return (
         <Form
              initialValues={initialValues}
              onSubmit={(values,errors)=>{
                  this.save(values);
              }}
            >
         { ({values,handleChange,handleBlur,handleSubmit,errors,touched}) => {
            return (<form onSubmit={handleSubmit} method="POST">
            <span>
               <input className="form-control" defaultValue={values.chapter_title} name='chapter_title'
                  onChange={handleChange}/>
               <button className="btn btn-primary m-2 btn-sm" type="submit">save</button>
               <button className="btn btn-danger btn-sm"
                  onClick={this.cancel}>cancel</button>
            </span>
         </form>)
         }}
         </Form>
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
