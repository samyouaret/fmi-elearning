import React,{Component} from 'react'
import ReactDOM from 'react-dom'

export default class FileUploader extends Component{
   constructor(props){
      super(props)
      this.state = {
         errors : null,
         options : this.props.options || {},
         isLoaded : false,
         progressValue : 0,
         files:null,
         hasFile : false
      }
      this.reload = () =>{
         this.multiRequest();
      }
      this.upload = (event) =>{
         if (event.type=="change") {
            this.handleChange(event);
         }
         this.request();
      }
     this.handleChange = (event) => {
         const target = event.target;
         console.log(event.type);
         const value = target.files;
         let hasValue = Boolean(value);
        this.setState({
            files : value,
            fileName : target.name,
            hasFile : hasValue
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
         form_data.append(this.state.fileName,files[key]);
     }
     console.log(form_data);
     let $this  = this;
     $.ajax({
        xhr: () => {
          var xhr = new window.XMLHttpRequest();
          xhr.upload.addEventListener("progress", function(evt) {
              if (evt.lengthComputable) {
                  var percent = (evt.loaded / evt.total) * 100;
                  $this.setState({
                     progressValue: percent
                  })
                   //Do something with upload progress here
              }
         }, false);

         xhr.addEventListener("progress", function(evt) {
             if (evt.lengthComputable) {
                var percent = (evt.loaded / evt.total) * 100;
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
     data: form_data,
     progress: function(e) {
                      if(e.lengthComputable) {
                          var pct = (e.loaded / e.total) * 100;
                          $('#prog')
                              .progressbar('option', 'value', pct)
                              .children('.ui-progressbar-value')
                              .html(pct.toPrecision(3) + '%')
                              .css('display', 'block');
                      } else {
                          console.warn('Content Length not reported!');
                      }
      }
     })
     .done(function(data) {
        console.log(data);
        console.log("success");
     })
     .fail(function(msg) {
        console.log(msg);
        console.log("error");
     });
  }
   render(){
    return this.props.children({
      upload :this.upload,
      handleChange:this.handleChange,
      progressValue: this.state.progressValue,
      hasFile:this.state.hasFile
    })
   }
}
