import React,{Component} from "react"
import Form from '../FormComponents/Form'
import Input from '../FormComponents/Input'
import Select from '../FormComponents/Select'
import FileInput from '../providers/FileInput'
import DataProvider from '../providers/DataProvider'

export default class Curriculum extends Component {
   constructor(props){
      super(props);
      this.state = {
         editing : false
      }
      this.renderForm = this.renderForm.bind(this);
   }
   renderForm(){
       return null;
   }
   render(){
      if (this.state.editing) {
         return this.renderForm();
      }
      return (
         <DataProvider>
         {(result,error,refersh)=>{
             return
             ( <div className="card col-8"  style={{minHeight:500 + "px"}}>
                  Curriculum
               </div>
            )
        }}
       </DataProvider>
      )
   }
}
