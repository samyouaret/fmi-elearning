import React,{Component} from 'react'
import ReactDOM from 'react-dom'

export default class DataProvider extends Component{
   constructor(props){
      super(props)
      this.state = {
         options : this.props.options,
         error : null,
         data : [],
         isloaded : false
      }
      this.refresh= () =>{
         this.load();
      }
   }
   load(){
      $.ajax(this.state.options)
      .done((data) =>{
         this.setState(prevState => ({
            isLoaded: true,
            data : data
         }))
     }).fail((msg) =>{
        console.log(msg);
        console.log(msg.responseJSON);
        this.setState(prevState => ({
          isLoaded: true,
          error : msg.responseJSON
       }))
    }).always((msg) =>{
        if (this.props.after) {
           this.props.after(msg);
        }
     });
   }
   componentDidMount(){
      this.load();
   }
   render(){
     const {error, isLoaded, data } = this.state;
     if (error) {
        return this.props.onError ? this.props.onError(error) :
         <div>oops ! an error Has happend.</div>;
     }else if (!isLoaded) {
      return this.props.onLoading ? this.props.onLoading() :
       <div>loading...</div>;
   }else{
      return (
         this.props.children(data,this.refresh)
      )
   }
   }
}
