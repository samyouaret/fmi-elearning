import React,{Component} from "react"
export default class Input extends Component{
   constructor(props) {
      super(props);
   }
   render(){
      return (<input className="form-control" {...this.props}/>)
   }
}
