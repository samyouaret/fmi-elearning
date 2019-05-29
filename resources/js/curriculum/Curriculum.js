import React,{Component} from "react"
import Form from '../formcomponents/Form'
import Input from '../formcomponents/Input'
import Select from '../formcomponents/Select'
import FileInput from '../providers/FileInput'
import DataProvider from '../providers/DataProvider'
import Chapter from './Chapter'
import Loading from '../components/Loading.js'
import request from '../helpers/request.js'
import findByAttr from '../helpers/findByAttr.js'

export default class Curriculum extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : false,
         chapters : []
      }

      this.cancel = ()=>{
         this.setState({
            editing : false
         })
      };
      this.options =
        {
           url : "/curriculum/"  + this.props.id,
           method:"GET",
           contentType: 'application/json',
        };
        this.addNewChapter = ()=>{
           request("/curriculum/chapter/create/" + this.props.id,{},"POST")
          .done((message)=>{
             let newChapter = {
                 ...message.data,
                 contents : []
             }
            this.setState({
               chapters :[
                  ...this.state.chapters,
                  newChapter
               ]
            })
          })
        };
        this.deleteChapter = ($id)=>{
           request("/curriculum/chapter/" + $id,{},"DELETE")
          .done((message)=>{
             let pos  = findByAttr(this.state.chapters,"id",$id);
             this.state.chapters.splice(pos,1);
            this.setState({
               chapters :this.state.chapters
            })
          })
        };
   }
   // data is array of obj are ordered by chapter_id
   shape_chapters(data){
     let current_id = 0;
     let current_index = -1;
     let chapters = [];
     // visited_chapters = [];
     for (let chapter_index in data){
       let {chapter_id,chapter_title,...content} = data[chapter_index];
       // console.log(content);
       if(current_id!=data[chapter_index].chapter_id){
         current_id = data[chapter_index].chapter_id;
         current_index++;
          let newChapter = {
           chapter_id : chapter_id,
           chapter_title : chapter_title,
           contents : []
         }
         chapters[current_index] = newChapter;
       }
       if (content.content_id!=null) {
          chapters[current_index].contents.push(content);
       }
     }
     return chapters;
   }
   renderChapters(chapters){
      // console.log(organized_chapters);
      return chapters.map((chapter)=> {
            return (<Chapter key={chapter.chapter_id}
               contents={chapter.contents}
               id={chapter.chapter_id}
               title={chapter.chapter_title}
               delete={this.deleteChapter.bind(this,chapter.chapter_id)}
               />);
      })
   }
   renderNewChapter(){
      return (<div className="card col-sm-8"  style={{minHeight:500 + "px"}}>
         <Chapter contents={[]} title="title example"/>
         <button className="btn btn-primary m-2 btn-sm align-self-end"
         onClick={this.cancel}>cancel</button>
        </div>)
   }
   render(){
      if (this.state.editing) {
        return  this.renderNewChapter();
     }else {
      return  (<DataProvider options={this.options}
                   renderLoading={()=>{
                      return <Loading/>
                   }}
                   renderError={(error)=>{
                      // this.updateError(error);
                      return (<div className="alert alert-danger">{error.message}</div>)
                   }}
                   onSuccess={(data)=>{
                      console.log(this.shape_chapters(data));
                      this.setState({
                        chapters : this.shape_chapters(data)
                     })
                   }}
                   >
                   <div className="card col-sm-8"  style={{minHeight:500 + "px"}}>
                    {this.renderChapters(this.state.chapters)}
                    <button className="btn btn-secondary btn-sm mt-3 align-self-end"
                       onClick={this.addNewChapter}>+ new chapter</button>
                   </div>
            </DataProvider>)
     }
   }
}
