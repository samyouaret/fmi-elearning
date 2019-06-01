import React,{Component} from "react"
import Form from '../formcomponents/Form'
import Input from '../formcomponents/Input'
import Select from '../formcomponents/Select'
import FileInput from '../providers/FileInput'
import FileUploader from '../providers/FileUploader'
import DataProvider from '../providers/DataProvider'
import ProgressBar from '../components/ProgressBar.js'
import Loading from '../components/Loading.js'
import ResourceList from './ResourceList'
import request from '../helpers/request.js'
import isEqual from '../helpers/isEqual.js'
import findByAttr from '../helpers/findByAttr.js'

export default class Content extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : 0,
         data : this.props.data || {},
         fileList : [],
         multiple : true,
         errors : {},
         hasMessage : false,
      };
      this.updateEditing= (val,data)=>{
         this.setState({
            editing : val,
            hasMessage:false,
            ...data
         })
      }
      this.options = {
         url : "/curriculum/content/resources/" + this.props.data.content_id
      }
      //edit mode
     this.edit = ()=>{
      this.updateEditing(1);
     };
     //add a file
     this.addFile = ()=>{
       this.updateEditing(2,{multiple:true});
     };
     //add a video
     this.addVideo = ()=>{
       this.updateEditing(2,{multiple:false});
     };
     this.cancel =()=>{
        this.updateEditing(0);
     };
     this.timer = null;
     this.handleChange = (event)=>{
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        console.log(target.type);
        console.log(value);
        let data = {
          ...this.state.data,
        [target.name] : value
        }
        console.log(isEqual(data,this.state.data));
        clearTimeout(this.timer);
        this.timer = null;
        console.log(data,this.state.data);
        if(!isEqual(data,this.state.data)){
           this.setState({
             data : data
          })
          data.is_open_for_free *=1;
          data.is_mandatory *=1;
          this.update(data);
        }
     };
     this.onupload = (data)=>{
        let state = {
           hasMessage :true,
           message : {
             message : data.message,
             status :  data.status,
          },
          editing:1
         };
         if (this.state.multiple) {
             state.fileList = [...this.state.fileList,...data.files];
             // state.multiple = true
          }else {
            state.data = {
               ...this.state.data,
               video_url : data.data.video_url || ""
            }
            var video = document.createElement('video');
            video.setAttribute('src', data.data.video_url);
            video.onloadedmetadata = ()=>{
               state.data.time_required_in_sec = Math.round(video.duration);
            }
          }
        console.log(state);
       this.setState(state);
     }
     this.update = (data)=>{
        this.timer = setTimeout(()=>{
           data.video_url = data.video_url || "";
          request("/curriculum/content/update/" + this.state.data.content_id,data,"PUT")
          .done((message)=>{
            this.setState({
               hasMessage:true,
               message : message,
               data : data
            });
         }).fail(({responseJSON})=>{
            let message = responseJSON.message;
           if (responseJSON.errors) {
             let errors = responseJSON.errors;
             message = errors.content_title ||  errors.is_mandatory ||
             errors.is_open_for_free || message;
           }
           console.log(message);
           this.setState({
               hasMessage:true,
               message : {
                  message : message,
                  status : "error"
               }
          });
        });
     },2000);
     }
     this.deleteVideo = ()=>{
        request("/curriculum/content/removevideo/" + this.state.data.content_id,{},"DELETE").done((message)=>{
           this.setState({
              data : {
                 ...this.state.data,
                 video_url:""
              },
              hasMessage:true,
              message : message
           })
        }).fail(this.setMessage);
     }
     this.setMessage= (message)=>{
        this.setState({
          hasMessage :true,
          message : message
       })
     }
     this.deleteResource = ($id)=>{
        console.log(findByAttr(this.state.fileList,"id",$id));
        request("/curriculum/content/resource/remove/" + $id,{},"DELETE").done((message)=>{
           let pos = findByAttr(this.state.fileList,"id",$id);
           this.state.fileList.splice(pos,1);
           this.setState({
             fileList : this.state.fileList,
             hasMessage:true,
             message : message
          })
        }).fail(this.setMessage);
   }
  }
   renderDisplay(){
     return (
         <li className="list-group-item d-flex justify-content-between align-items-center">
           <span>{this.state.data.content_title} </span>
           <span>
              <button className="btn btn-primary btn-sm mr-1" onClick={this.edit}>edit</button>
              <button className="btn btn-danger btn-sm" onClick={this.props.delete}>delete</button>
           </span>
        </li>
    )
   }
   renderVideo(){
      return this.state.data.video_url ?
        (<React.Fragment>
           <video className="my-2" id="content_video"
           width="100%" height="auto"
           src={this.state.data.video_url} controls>
        </video>
       <button className="btn btn-danger btn-sm align-self-end"
        onClick={this.deleteVideo}>delete video</button>
       </React.Fragment>) :
        <h5>this content has no video</h5>;
   }
   renderContentEdit(){
      let data = {
         content_title : this.state.data.content_title,
         is_open_for_free : this.state.data.is_open_for_free
      }
      let  deleteVideoButton = null;
      if (this.state.data.video_url) {
         deleteVideoButton = (<button className="btn btn-danger btn-sm align-self-end"
           onClick={this.deleteVideo}>delete video</button>);
      }
      return (
         <React.Fragment>
            <div className="w-100 my-2">
             <input className="form-control" defaultValue={this.state.data.content_title} name='content_title'
                onBlur={this.handleChange}/>
             <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="form-control" onBlur={this.handleChange}
                     name="is_open_for_free"
                     defaultChecked={this.state.data.is_open_for_free}
                     className="custom-control-input" id="is_open_for_free"/>
                  <label className="custom-control-label" htmlFor="is_open_for_free">open for free</label>
              </div>
             <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="form-control" onBlur={this.handleChange}
                     name="is_mandatory"
                     defaultChecked={this.state.data.is_mandatory}
                     className="custom-control-input" id="is_mandatory"/>
                  <label className="custom-control-label" htmlFor="is_mandatory">mandatory</label>
              </div>
            </div>
            <span>
               <button className="btn btn-secondary btn-sm mr-1"onClick={this.addVideo}>add video</button>
               <button className="btn btn-primary btn-sm" onClick={this.addFile}>add file</button>
           </span>
        <DataProvider options={this.options}
           renderLoading={()=>{return <Loading/>}}
            renderError={(error)=>{
                 return (<div className="alert alert-danger">{error.message}</div>)
            }}
            onSuccess={(data)=>{
               this.setState({
                  fileList : data
               })
            }}
          >
          <div className="container my-2">
           <div className="row">
              <div className="col-sm-6 mb-1">
                 {this.renderFileList(this.state.fileList)}
               </div>
              <div className="col-sm-6">
                  <h5>Video</h5>
                    <span className="list-group-item d-flex flex-column align-items-center">
                       {this.renderVideo()}
                    </span>
              </div>
           </div>
          </div>
       </DataProvider>
    </React.Fragment>
     )
   }
   renderFileList(list){
      // console.log(list);
      if (list && list.length==0) {
         return null;
      }
      return (<ResourceList context={this} onClick={this.deleteResource} list={list} title="files"/>);
   }
   renderFileUploader(){
      const options = {
         url : "/curriculum/content/resource/upload",
         // accepts : ['pdf','docx']
      }
      return (
            <FileUploader options={options} data={{id:this.state.data.content_id,
                  isVideo: !this.state.multiple}}
               onError={(error)=>{
                  console.log("sucess");
                  console.log(error);
                     this.setState({
                        hasMessage :true,
                        message : error
                     })
                }}
               onupload={this.onupload}>
             {({upload,handleChange,progressValue,hasFile,errors})=>{
                let cls = hasFile ? "btn btn-secondary btn-sm mr-1" :
                "btn btn-secondary btn-sm mr-1 disabled";
           return (
             <div className="w-100">
             <div className="w-100 my-2">
               <input className="form-control" defaultValue={this.state.data.content_title} name='title' onChange={this.handleChange}/>
              </div>
               <span className="flex-row">
                <label className="btn btn-secondary btn-sm mr-1" style={{cursor:"pointer"}}>
                <input type="file" name ="file[]"  multiple={this.state.multiple} onChange={handleChange} className="d-none"/>browse file</label>
                <label className={cls}
                style={{cursor:"pointer"}} onClick={upload} disabled={hasFile}>upload</label>
                <label className="btn btn-danger btn-sm align-self-end" style={{cursor:"pointer"}}onClick={this.edit}>cancel</label>
               </span>
             <ProgressBar value ={progressValue} style={{height: 5 + "px"}} id="fileprogress"/>
            </div>)
           }}
        </FileUploader>
      )
   }
   renderMessage(obj){
      let className = "alert my-1 ";
      if (obj.status == "success") {
         className += "alert-success"
      }else {
         className += "alert-danger"
      }
      return <div className={className}>{obj.message}</div>
   }
   render(){
      let content = null;
      let message = null;
      if (this.state.editing == 0) {
          return this.renderDisplay();
      }else{
          content  = this.state.editing == 1 ? this.renderContentEdit() :
          this.renderFileUploader();
     }
     if (this.state.hasMessage) {
        message = this.renderMessage(this.state.message);
     }
     return (
        <li className="list-group-item d-flex flex-column align-items-center">
           {message}
           <span className="close align-self-end" style={{cursor:"pointer"}}
              onClick={this.cancel}>&times;</span>
           {content}
        </li>
     )
   }
}
