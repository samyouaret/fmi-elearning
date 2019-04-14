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
         contents  : this.props.contents || {}
      }
     this.addContent = ()=>{
        this.setState({
           editing : true
        })
     };
     this.cancel = ()=>{
        this.setState({
           editing : false
        })
     };
   }
   renderContents(){
      return this.state.contents.map(function(content) {
         return (<Content key={content.id} data={content}/>);
      })
   }
   render(){
      return (
       <div className="card mt-2">
          <div className="card-header">{this.state.title}</div>
          <ul className="list-group list-group-flush bg-light">
         {this.renderContents()}
         </ul>
      </div>
      )
   }
}
