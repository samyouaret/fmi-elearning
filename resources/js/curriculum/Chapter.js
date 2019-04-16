import React,{Component} from "react"
import Form from '../FormComponents/Form'
import Input from '../FormComponents/Input'
import Select from '../FormComponents/Select'
import FileInput from '../providers/FileInput'
import Content from './Content'

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
              id :this.randomInteger(),
              title : "an example content title"
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
         return (<Content key={content.id}  delete = {this.deleteContent.bind(this,content.id)}
            data={content}/>);
      })
   }
   deleteContent(id){
      let contents = this.state.contents;
      let pos = -1;
      for (var i = 0; i < contents.length; i++) {
         if (contents[i].id ==id) {
            pos = i;
            break;
         }
      }
      contents.splice(pos,1);
      this.setState({
         contents : contents
      })
   }
   randomInteger(){
      return Math.floor(Math.random() * 10000)
   }
   renderTitleForm(){
      return (
         <span>
         <input className="form-control" defaultValue={this.state.title} name='title' onChange={this.handleChange}/>
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
   }
}
