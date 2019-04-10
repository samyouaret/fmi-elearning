import React, { Component } from 'react';

export default class Form extends Component {
   constructor(props){
      super(props);
      this.state = {
         values : this.props.initialValues || {},
         touched : {},
         isValid : false,
         errors : this.props.initialErrors || {},
         validateOnChange: this.props.validateOnChange || false
      }
      this.handleChange = (event) => {
         const target = event.target;
         const value = target.type === "checkbox" ? target.checked :
         target.type =='file' ? target.files[0] : target.value;
         if (this.ShouldValidateOnChange()) {
            let errors = this.props.validate(this.state.values);
            this.updateErrors(errors);
         }
         this.setState(prevState => ({
            values : {
               ...prevState.values,
               [target.name] : value
            }
          })
        )
      };
      this.handleBlur = (event) => {
         const target = event.target;
         this.setState(prevState =>({
              touched : {
                  ...prevState.touched,
                  [target.name] : true
              }
            })
         )
      };
      this.ShouldValidate = () => {
        return Boolean(this.props.validate);
     };
     this.ShouldValidateOnChange = () => {
        return Boolean(this.state.validateOnChange && this.props.validate);
     };
     this.updateErrors = (errors)=>{
       this.setState(prevState =>{
          return {
                errors : errors,
                isValid : false
           }
       })
     };
      this.validate = () => {
         let errors = {};
            if (this.ShouldValidate()) {
               errors = this.props.validate(this.state.values);
               this.updateErrors(errors);
            }
            return this.isEmpty(errors);
      }
      this.handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.validate());
        if (this.validate()) {
             this.props.onSubmit(this.state.values);
        }
      };
      this.isEmpty = (obj) => {
         return Object.entries(obj).length === 0 && obj.constructor === Object
      };
   }
   static getDerivedStateFromProps(nextProps,nextState){
      return {errors : nextProps.initialErrors}
   }
  render() {
     return  (
        this.props.children(
         {...this.state,
         handleChange:this.handleChange,
         handleBlur : this.handleBlur,
         handleSubmit : this.handleSubmit
      })
    )
  }
}
