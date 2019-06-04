import React,{Component} from "react"
import Form from '../formcomponents/Form'
import Input from '../formcomponents/Input'
import Select from '../formcomponents/Select'
import FileInput from '../providers/FileInput'
import Content from './Content'
import ResourceList from './ResourceList'
import request from '../helpers/request.js'
import findByAttr from '../helpers/findByAttr.js'

export default class Chapter extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : false,
         title  : this.props.title || "",
         id : this.props.id,
         contents  : this.props.contents || {},
      }
   }
   renderContents(){
      return this.state.contents.map((content) =>{
         return (<Content key={content.content_id}
            delete = {this.deleteContent.bind(this,content.content_id)}
            update = {this.updateContent.bind(this)}
            chapterId={this.props.id}
            data={content}/>);
      })
   }

   renderTitleForm(){
      let initialValues = {
         id : this.state.id,
         chapter_title : this.state.title
      }
   render(){
      return (
      null
      )
   }

}
