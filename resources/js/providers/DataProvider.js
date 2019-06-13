import React,{Component} from 'react'
import ReactDOM from 'react-dom'

export default class DataProvider extends Component{
   constructor(props){
      super(props)
      this.state = {
         error : null,
         data : [],
         isLoaded : false,
      }
      this.times = 0;
      this.reload = () =>{
         this.multiRequest();
      }
      this.update = (data) =>{
         this.setState(data);
      }
   }
   componentDidUpdate(){
      console.log("update");
   }
   multiRequest(){
      let requests = [];
      if (Array.isArray(this.props.options)) {
         for (var i = 0; i < this.props.options.length; i++) {
            requests[i] = $.ajax(this.props.options[i]);
         }
      }else {
         requests[0] = $.ajax(this.props.options);
      }
      $.when(...requests)
        .then((...data) => {
           let result = requests.length < 2 ? data[0] : data.map(function(ele) {
              return ele[0];
           });
           if (this.props.onSuccess) {
             this.props.onSuccess(result);
          }
          this.setState(()=>({
             data : result,
             isLoaded: true
        }))
     },
     (msg)=>{
        //error has happened
         console.log("called error");
         console.log(msg);
         let error = msg.responseJSON.errors || msg.responseJSON
        this.setState(() => ({
          isLoaded: true,
          error : error
       }))
       if (this.props.onError) {
          this.props.onError(error);
       }
     }
  )
  }
   componentDidMount(){
      this.multiRequest();
   }
   render(){
     const {error, isLoaded, data} = this.state;
     this.times++;
     if (error) {
        console.log("error renderd :" + this.times);
        return this.props.renderError && this.props.renderError(error) || null;
     }else if (!isLoaded) {
        console.log("loading.. renderd :" + this.times);
      return this.props.renderLoading && this.props.renderLoading() || null;
     }else{
         return this.props.children && this.props.children.constructor.name == "Function" ?
         this.props.children(data,error,this.reload,this.update) : this.props.children || null;
     }
   }
}
