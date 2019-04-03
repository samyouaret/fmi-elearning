import React, { Component } from 'react';

export default class Form extends Component {
   constructor(props){
      super(props);
      this.state = {
         values : this.props.initialValues || {},
         touched : {},
         isValid : false,
         errors : {}
      }
      this.handleChange = (event) => {
         const target = event.target;
         const value = target.type === "checkbox" ? target.checked : target.value;
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
      this.validate = () => {
         if (this.props.validate) {
            let errors = this.props.validate(this.state.values);
            if (this.isEmpty(errors)) {
               return true;
            }
            this.setState({
               errors : errors,
               isValid : false
            })
            return false
         }
      }
      this.handleSubmit = (event) => {
        event.preventDefault();
        if (this.validate()) {
           this.setState({
             errors : {},
             isValid : true
           })
           this.props.onSubmit(this.state.values);
        }
      };
      this.isEmpty = (obj) => {
         return Object.entries(obj).length === 0 && obj.constructor === Object
      };
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
