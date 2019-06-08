import React,{Component} from "react"
import Form from '../formcomponents/Form'
import Input from '../formcomponents/Input'
import Select from '../formcomponents/Select'
import FileInput from '../providers/FileInput'
import FileUploader from '../providers/FileUploader'
import DataProvider from '../providers/DataProvider'
import ProgressBar from '../components/ProgressBar.js'
import Loading from '../components/Loading.js'
import Dialog from '../components/Dialog.js'
import request from '../helpers/request.js'
import isEqual from '../helpers/isEqual.js'
import findByAttr from '../helpers/findByAttr.js';

export default class ProfileEditor extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         values : {},
         errors : {},
         universities : [],
         departments : [],
         dialogData :{},
         displayDialog : false
      }
      this.options = {
         url : "/profile/edit/" + this.getCourseId()
      }
      this.onupload = (data)=>{
         this.setState({
            values : {
               ...this.state.values,
               cover_image : data.cover_image
            },
            displayDialog :true,
            dialogData:{
               ...this.state.dialogData,
                  title : data.status,
                  body : data.message,
                  type : "success"
            }
         })
      }
   }
   showDialog(message,type){
      this.setState({
        displayDialog :true,
        dialogData:{
           ...this.state.dialogData,
              title : message.status,
              body : message.message,
              type : type
        }
      })
   }
   hideDialog(){
      this.setState({
        displayDialog :false
      })
   }
   getCourseId(){
    return location.pathname.split("/")[2];
   }
   save(data,errors){
      request('/profile/' + this.getCourseId(),data,'PUT').done((message)=>{
       this.showDialog(message,"success");
   }).fail(({responseJSON})=> {
         let errors = responseJSON.errors || responseJSON;
         this.setState({
            errors : errors
         })
     })
   }
   renderDialog(){
      return this.state.displayDialog ?
      <Dialog  dismiss={this.hideDialog.bind(this)}
         {...this.state.dialogData}></Dialog> : null;
   }
   renderErrors(errors){
      return (<small className="invalid-feedback d-inline-block">
       { errors.map(function(elem) {
          return elem;
        })
        }
      </small>)
   }
  renderForm(){
    return (
      <DataProvider options={this.options}
          renderLoading={()=>{return <Loading/>}}
          renderError={(error)=>{
                return (<div className="alert alert-danger">{error.message}</div>)
          }}
          onSuccess={(data)=>{
             this.setState({
                 values : data.values,
                 universities : data.universities,
                 departments : data.departments
             })
          }}
        >
      <Form
         initialValues={this.state.values}
         initialErrors={this.state.errors}
         onSubmit={(values,errors)=>{
             this.save(values);
         }}
         >
       {({values,handleChange,handleSubmit,errors,touched}) => {
          return (
          <form onSubmit={handleSubmit} method="POST">
           <div className="form-group">
             <label htmlFor="first_name" className="form-control-label m-2">First Name</label>
            <input className="form-control" defaultValue={values.first_name}
               name='first_name'
               onChange={handleChange}/>
            {errors.first_name && this.renderErrors(errors.first_name)}
           </div>
           <div className="form-group">
             <label htmlFor="last_name" className="form-control-label m-2">Last Name</label>
            <input className="form-control" defaultValue={values.last_name}
               name='last_name'
               onChange={handleChange}/>
            {errors.last_name && this.renderErrors(errors.last_name)}
           </div>
           <div className="form-group">
             <label>university</label>
            <Select  defaultValue= {values.university_id} name="university_id" onChange={handleChange}
            data={this.state.universities} keys={{value:"name"}}/>
         {errors.university && this.renderErrors(errors.university)}
          </div>
          <div className="form-group">
             <label>department</label>
            <Select  defaultValue= {values.department_id} name="department_id" onChange={handleChange}
            data={this.state.departments} keys={{value:"name"}}/>
         {errors.department && this.renderErrors(errors.department)}
          </div>
          <div className="form-group">
             <label>Biography</label>
            <textarea  className="form-control"
               rows="4" name="biography" value={values.biography} onChange={handleChange}>
            </textarea>
            {errors.biography && this.renderErrors(errors.biography)}
          </div>
            <button className="btn btn-primary m-2 btn-sm" type="submit">save</button>
      </form>)
         }}
      </Form>
   </DataProvider>
    )
  }
  renderFileUploader(){
     const options = {
        url : "/profile/image/upload",
        // accepts : ['pdf','docx']
     }
     return (
           <FileUploader options={options}
              onError={(message)=>{
                  this.setState({
                     displayDialog :true,
                     dialogData:{
                           title : "uploading file failed",
                           body : message.message,
                           type : "error"
                     }
                  })
               }}
              onupload={this.onupload}>
            {({upload,handleChange,progressValue,hasFile,errors})=>{
               let cls = hasFile ? "btn btn-secondary btn-sm mr-1" :
               "btn btn-secondary btn-sm mr-1 disabled";
          return (
            <div className="w-100 text-center">
              <span className="flex-row">
               <label className="btn btn-secondary btn-sm mr-1" style={{cursor:"pointer"}}>
               <input type="file" name ="cover_image"
                  onChange={handleChange} className="d-none"/>browse image</label>
               <label className={cls}
               style={{cursor:"pointer"}} onClick={upload} disabled={hasFile}>upload</label>
              </span>
            <ProgressBar value ={progressValue} style={{height: 5 + "px"}} id="fileprogress"/>
           </div>)
          }}
       </FileUploader>
     )
  }
  renderImage(){
     return (<div className="text-center">
         <img className="img-fluid" style={{borderRadius: "50%",maxWidth:"60%",
            maxHeight:"100%"}}
            src={"/storage/profile_image/" +this.state.values.cover_image} alt="user"/>
    </div>)
 }
  render(){
    return(<div className="row">
        <div className="col-sm-4">
           {this.renderImage()};
           {this.renderFileUploader()};
        </div>
        <div className="col-sm-6">
           {this.renderForm()};
        </div>
         {this.renderDialog()}
     </div>)
  }
}
