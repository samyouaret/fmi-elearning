import React,{Component} from "react"
export default class Textarea extends Component {
   constructor(props) {
      super(props);
   }
   render(){

   }
   renderSelectList(arr,{key='id',value,compare}){
      return arr.map((ele)=> {
         let selected ="";
         if (compare===ele[key]) {
            console.log(ele[key]);
            selected = "selected";
         }
       return <option key={ele[key]} selected value={ele[key]}>{ele[value]}</option>
      })
   }
}
