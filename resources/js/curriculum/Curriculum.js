import React,{Component} from "react"
import Form from '../FormComponents/Form'
import Input from '../FormComponents/Input'
import Select from '../FormComponents/Select'
import FileInput from '../providers/FileInput'
import DataProvider from '../providers/DataProvider'
import Chapter from './Chapter'

export default class Curriculum extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : false,
         chapters :[
            {
               id : 1,
            title : "starting with life cylce",
            contents : [
               {
                 id : 1,
                 title : "get starting with react"
              },
              {
                 id : 2,
                 title : "learn lists and forms"
              }
           ]
           },
           {
            id : 2,
            title : "props and rendering",
           contents : [
             {
                id : 1,
                title : "render props with function"
             },
             {
                id : 2,
                title : "controlled Components"
             }
          ]
          }
         ]
      }
   }
   renderChapters(){
      return this.state.chapters.map(function(chapter) {
         return (<Chapter key={chapter.id} contents={chapter.contents}
            title={chapter.title}/>);
      })
   }
   render(){
      // if (this.state.editing) {
      //
      // }
      return (
     <div className="card col-sm-8"  style={{minHeight:500 + "px"}}>
        {this.renderChapters()}
       </div>
      )
   }
}
