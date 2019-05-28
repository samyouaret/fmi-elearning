import React,{Component} from "react"
import Form from '../formcomponents/Form'
import Input from '../formcomponents/Input'
import Select from '../formcomponents/Select'
import FileInput from '../providers/FileInput'
import DataProvider from '../providers/DataProvider'
import Chapter from './Chapter'


export default class Curriculum extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : false,
         chapters : []
      }
      this.addNewChapter = ()=>{
         this.setState({
            editing :true
         })
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
   }
   shape_chapters(data){
     let current_id = 0;
     let current_index = -1;
     let chapters = [];
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
       chapters[current_index].contents.push(content);
     }
     return chapters;
   }
   renderChapters(chapters){
      // console.log(organized_chapters);
      return chapters.map(function(chapter) {
            return (<Chapter key={chapter.chapter_id}
               contents={chapter.contents}
               id={chapter.chapter_id}
               title={chapter.chapter_title}/>);
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
      //   return (
      //      <DataProvider options={this.options}
      //        renderLoading={()=>{
      //           return (<div className="d-flex justify-content-center">
      //                  <div className="spinner-border" role="status">
      //                   <span className="sr-only">Loading...</span>
      //                  </div>
      //                 </div>)
      //        }}
      //        renderError={(error)=>{
      //           // this.updateError(error);
      //           return (<div className="alert alert-danger">{error.message}</div>)
      //        }}
      //        Onsuccess={(data)=>{
      //           return  (<p>sucess</p>)
      //        }}
      //        OnError={(error)=>{
      //           return (<p>error</p>)
      //        }}
      //        >
      //    {(data,error,reload,update)=>{
      //     return (
      //      <div className="card col-sm-8"  style={{minHeight:500 + "px"}}>
      //       {this.renderChapters(data)}
      //       <button className="btn btn-secondary btn-sm mt-3 align-self-end"
      //          onClick={this.addNewChapter}>+ new chapter</button>
      //      </div>
      //     )
      //    }}
      // </DataProvider>)
      return  (<DataProvider options={this.options}
                   renderLoading={()=>{
                      return (<div className="d-flex justify-content-center">
                             <div className="spinner-border" role="status">
                              <span className="sr-only">Loading...</span>
                             </div>
                            </div>)
                   }}
                   renderError={(error)=>{
                      // this.updateError(error);
                      return (<div className="alert alert-danger">{error.message}</div>)
                   }}
                   onSuccess={(data)=>{
                      this.setState({
                        chapters : this.shape_chapters(data)
                     })
                   }}
                   onError={(error)=>{
                      
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
