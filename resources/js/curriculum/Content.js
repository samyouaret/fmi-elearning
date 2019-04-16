import React,{Component} from "react"
import Form from '../FormComponents/Form'
import Input from '../FormComponents/Input'
import Select from '../FormComponents/Select'
import FileInput from '../providers/FileInput'
import FileUploader from '../providers/FileUploader'

export default class Content extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : 0,
         data : this.props.data || {},
         hasFile : false,
         hasVideo : false,
         hasArticle : false,
         videoUrl :"",
         article : {},
         fileList : [],
         video : [],
      };
      this.updateEditing= (val)=>{
         this.setState({
            editing : val
         })
      }
     this.edit = ()=>{
      this.updateEditing(1);
     };
     this.addFile = ()=>{
       this.updateEditing(2);
     };
     this.addVideo = ()=>{
       this.updateEditing(3);
     };
     this.addArticle = ()=>{
      this.updateEditing(4);
     };
     this.cancel = ()=>{
        this.updateEditing(0);
     };
     this.handleChange = (e)=>{
        let target = e.target.name;
        this.setState({
          [target.name] : target.value
        })
     };
   }
   renderDisplay(){
     return (
         <li className="list-group-item d-flex justify-content-between align-items-center">
           <span>
             {this.state.data.title}
           </span>
           <span>
              <button className="btn btn-primary btn-sm mr-1" onClick={this.edit}>edit</button>
              <button className="btn btn-danger btn-sm" onClick={this.props.delete}>delete</button>
           </span>
        </li>
    )
   }
   renderContent(){
      return (
          <li className="list-group-item d-flex flex-column align-items-center">
             <span className="close align-self-end" style={{cursor:"pointer"}}
                onClick={this.cancel}>x</span>
            <div className="w-100 my-2">
             <input className="form-control" defaultValue={this.state.data.title} name='title' onChange={this.handleChange}/>
          </div>
            <span>
               <div className="btn-group">
                  <button className="btn btn-secondary btn-sm">+ content</button>
                  <button className="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split mr-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#" onClick={this.addArticle}>Add article</a>
                    <a className="dropdown-item" href="#" onClick={this.addVideo}>Add video</a>
                  </div>
             </div>
               <button className="btn btn-primary btn-sm" onClick={this.addFile}>+ file</button>
            </span>
         </li>
     )
   }
   renderFileList(list){
      if (list.length==0) {
         return null;
      }
      return list.map(function(elem,index) {
         console.log(elem);
         let arr = elem.split('/');
         let name = arr[arr.length-1];
         return (<p  key={index+1}>
            <a className="text-success" href={location.host+ "/"+ elem}>{name}</a>
         </p>)
      });
   }
   renderFile(){
      const options = {
         url : "/curriculum/upload",
         // accepts : ['pdf','docx']
      }
      return (
         <li className="list-group-item d-flex flex-column align-items-center">
            <span className="close align-self-end" style={{cursor:"pointer"}}
               onClick={this.cancel}>x</span>
           <FileUploader options={options}
             onupload={(data)=>{
                let targetType = "hasFile";
                let fileType = "fileList";
                if (this.state.editing==3) {
                   targetType  = "hasVideo";
                   fileType = "video";

                }else if (this.state.editing==4) {
                   targetType  = "hasArticle";
                }
               this.setState({
                  [fileType] : data,
                  [targetType] : true
               })
             }}>
             {({upload,handleChange,progressValue,hasFile,errors})=>{
                let cls = hasFile ? "btn btn-secondary btn-sm mr-1" :
                "btn btn-secondary btn-sm mr-1 disabled";
               const  progressBar = this.renderProgressBar(progressValue);
               let err = null;
               console.log(errors);
               if (errors) {
                   err = errors.file.map(function(error,index) {
                     return <p key={index+1} className="text-danger">{error}</p>;
                  })
               }
               let multiple =this.state.editing ==2 ? true : false;
               let fileList = this.state.editing == 2 ? this.state.fileList :
               this.state.video;
               console.log("filelist");
               console.log( fileList);
           return (
             <div className="w-100">
             <div className="w-100 my-2">
               <input className="form-control" defaultValue={this.state.data.title} name='title' onChange={this.handleChange}/>
              </div>
               <span className="flex-row">
                <label className="btn btn-secondary btn-sm mr-1" style={{cursor:"pointer"}}>
                <input type="file" name ="file[]"  multiple={multiple} onChange={handleChange} className="d-none"/>browse file</label>
                <label className={cls}
                style={{cursor:"pointer"}} onClick={upload} disabled={hasFile}>upload</label>
                <label className="btn btn-danger btn-sm align-self-end" style={{cursor:"pointer"}}onClick={this.edit}>cancel</label>
               </span>
               {this.renderFileList(fileList)}
               {err}
             {progressBar}
            </div>)
           }}
        </FileUploader>
        </li>
      )
   }
   renderProgressBar(value){
     return value < 100 && value > -1  ?
      (<div className="progress w-100" style={{height: 5 + "px"}}>
         <div id="progressBar" className="progress-bar bg-secondary" role="progressbar" style={{width: value + "%"}} aria-valuenow={value} aria-valuemin="0" aria-valuemax="100"></div>
      </div>) : null;
   }
   render(){
      let content = null;
      if (this.state.editing == 0) {
          content = this.renderDisplay();
      } else if(this.state.editing == 1){
          content = this.renderContent();
     }else{
      content = this.renderFile();
     }
      return content;
   }
}
