import React,{Component} from "react"
export default class Select extends Component {
   constructor(props) {
      super(props);
   }
   renderList(arr,{key="id",value="value"}){
      return arr.map((ele)=> {
      return <option key={ele[key]} value={ele[key]}>{ele[value]}</option>
     })
   }
   render(){
      const {keys={},data,...rest} = this.props;
      return (
         <select className="form-control" {...rest}>
         {this.renderList(data,keys)}
         </select>
      )
   }
}
