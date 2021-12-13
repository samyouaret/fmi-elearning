import React,{Component} from 'react'
import ReactDOM from 'react-dom'

export default class FileUploader extends Component{
   constructor(props){
      super(props)
      this.state = {
         errors : null,
         options : this.props.options || {},
         data : this.props.data || {},
         progressValue : -1,
         files:null,
         hasFile : false,
         uploaded : false,
         accepts : this.props.options.accepts || []
      }
      this.validate = () =>{
         if (this.state.accepts.length==0) {
            return true;
         }
         let files = this.state.files;
         for (var i = 0; i < files.length; i++) {
            let type = files[i].type.split('/')[1];
                if (!this.state.accepts.includes(type)) {
                   return false;
             }
         }
         return true;
      }
      this.upload = (event) =>{
         if (event.type=="change") {
            this.handleChange(event);
         }
         if(!this.state.hasFile){
            return;
         }
         if (!this.validate()) {
             let name = this.state.name.replace('[]','');
            this.setState({
               errors : {
                  [name] : ["file must be of type " + this.state.accepts.join()]
               }
            })
         }else {
            this.request();
         }
      }
     this.handleChange = (event) => {
         const target = event.target;
         console.log(event.type);
         const value = target.files;
         let name = event.target.name
         let hasValue = Boolean(value);
        this.setState({
            files : value,
            name : name,
            hasFile : hasValue,
            uploaded:false
           })
     }
  }
  request(){
     $.ajaxSetup({
        headers: {
           'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
     });
     let files = this.state.files;
     var form_data = new FormData();
     for ( var key in files) {
         form_data.append(this.state.name,files[key]);
     }
     for ( var key in this.state.data) {
         form_data.append(key,this.state.data[key]);
     }
     console.log(form_data);
     let $this  = this;
     $.ajax({
        xhr: () => {
          var xhr = new window.XMLHttpRequest();
          xhr.upload.addEventListener("progress", function(evt) {
              if (evt.lengthComputable) {
                  var percent = (evt.loaded / evt.total) * 100;
                  console.log(evt);
                  $this.setState({
                     progressValue: percent
                  })
                   //Do something with upload progress here
              }
         }, false);

         xhr.addEventListener("progress", function(evt) {
             if (evt.lengthComputable) {
                var percent = (evt.loaded / evt.total) * 100;
                console.log(percent);
                $this.setState({
                   progressValue: percent
                })
                 //Do something with download progress
             }
         }, false);

         return xhr;
      },
     type: 'POST',
     url: this.props.options.url,
     contentType: false,
     processData: false,
     data: form_data
     })
     .done((data) =>{
        if (this.props.onupload) {
           this.props.onupload(data);
        }
        this.setState({
         hasFile : false,
         files : null
       })
        console.log(data);
        console.log("success");
     })
     .fail((msg)=> {
        console.log(msg);
        let errors =  msg.responseJSON.errors || msg.responseJSON
        if (this.props.onError) {
           this.props.onError(errors);
        }
        this.setState({
           errors : errors,
           hasFile : false,
           files : null
        })
        console.log("error");
     });
  }
   render(){
    return this.props.children({
      upload :this.upload,
      handleChange:this.handleChange,
      progressValue: this.state.progressValue,
      hasFile:this.state.hasFile,
      errors : this.state.errors
    })
   }
}
