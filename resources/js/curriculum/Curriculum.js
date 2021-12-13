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
import shapeChapters from '../helpers/shapeChapters.js'
import WrapperContent from '../components/WrapperContent'

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
            this.showDialog(message,"success");
          }).fail((jqXHR)=>{
             let message = jqXHR.responseJSON;
             this.showDialog(message,"error");
          });
        };
        this.deleteChapter = ($id)=>{
           request("/curriculum/chapter/" + $id,{},"DELETE")
          .done((message)=>{
             let pos  = findByAttr(this.state.chapters,"id",$id);
             this.state.chapters.splice(pos,1);
            this.setState({
               chapters :this.state.chapters
            })
            this.showDialog(message,"success");
         }).fail((jqXHR)=>{
            let message = jqXHR.responseJSON;
            this.showDialog(message,"error");
         });

        };
   }
   showDialog(message,type){
      this.props.toggleDialog(true,{
         title : message.status,
         body : message.message,
         type : type
      })
   }

   renderChapters(chapters){
      // console.log(organized_chapters);
      return chapters.map((chapter)=> {
            return (<Chapter key={chapter.chapter_id}
               contents={chapter.contents}
               id={chapter.chapter_id}
               title={chapter.chapter_title}
               delete={this.deleteChapter.bind(this,chapter.chapter_id)}
               showDialog={this.showDialog.bind(this)}
               />);
      })
   }
   render(){
      if (this.state.editing) {
        return  this.renderNewChapter();
     }else {
       return  ( <WrapperContent>
          <div className="card p-2"  style={{minHeight:500 + "px"}}>
               <DataProvider options={this.options}
                   renderLoading={()=>{
                      return <Loading/>
                   }}

                   renderError={(error)=>{
                      // this.updateError(error);
                      return (<div className="alert alert-danger">{error.message}</div>)
                   }}
                   onSuccess={(data)=>{
                      this.setState({
                        chapters : shapeChapters(data)
                     })
                   }}
                   >
                    {this.renderChapters(this.state.chapters)}
                    <button className="btn btn-secondary btn-sm mt-3 align-self-end"
                       onClick={this.addNewChapter}>+ new chapter</button>
             </DataProvider>
          </div>
         </WrapperContent>)
     }
   }
}
