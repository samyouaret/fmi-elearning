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
         data : this.props.data || {}
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
              <button className="btn btn-primary btn-sm" onClick={this.edit}>edit</button>
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
   renderFile(){
      const options = {
         url : "/curriculum/upload"
      }
      return (
         <li className="list-group-item d-flex flex-column align-items-center">
            <span className="close align-self-end" style={{cursor:"pointer"}}
               onClick={this.cancel}>x</span>
           <FileUploader options={options}>
             {({upload,handleChange,progressValue,hasFile})=>{
                let cls = hasFile ? "btn btn-secondary btn-sm mr-1" :
                "btn btn-secondary btn-sm mr-1 disabled";
               const  progressBar = this.renderProgressBar(progressValue);
           return (
             <div className="w-100">
             <div className="w-100 my-2">
               <input className="form-control" defaultValue={this.state.data.title} name='title' onChange={this.handleChange}/>
              </div>
               <span className="flex-row">
                <label className="btn btn-secondary btn-sm mr-1" style={{cursor:"pointer"}}>
                <input type="file" name ="file[]" multiple="multiple" onChange={handleChange} className="d-none"/>browse file</label>
                <label className={cls}
                style={{cursor:"pointer"}} onClick={upload} disabled={hasFile}>upload</label>
                <label className="btn btn-danger btn-sm align-self-end" style={{cursor:"pointer"}}onClick={this.edit}>cancel</label>
               </span>
             {progressBar}
            </div>)
           }}
        </FileUploader>
        </li>
      )
   }
   renderProgressBar(value){
     return value ?
      (<div className="progress w-100" style={{height: 10 + "px"}}>
         <div id="progressBar" className="progress-bar bg-info" role="progressbar" style={{width: value + "%"}} aria-valuenow={value} aria-valuemin="0" aria-valuemax="100"></div>
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
