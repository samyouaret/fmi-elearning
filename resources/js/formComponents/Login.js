import React, { Component } from 'react';
import Form from './Form'
export default class Login extends Component {
   constructor(props){
      super(props);
      this.validate = (values)=> {
         let errors = {};
         if (!values.email) {
         errors.email = 'Required';
         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
         errors.email = 'Invalid email address';
         }
         if (!values.password) {
         errors.password = 'Required';
         } else if (values.password.length <6) {
         errors.password = 'password length can\'t be less than 6 characters';
         }
         return errors;
      }
   }
  render() {
    return (
       <div className="card">
          <div className="card-header text-center">Login</div>
          <div className="card-body">
             <Form onSubmit={values=>{
                alert(JSON.stringify(values,null,2))
             }}
             validate={this.validate}>
             { ({values,handleChange,handleBlur,handleSubmit,errors,touched}) => {
              return (
                 <form onSubmit={handleSubmit}>
                 <div className="form-group">
                    <input type="text" className="form-control" name="email"
                    onChange={handleChange} onBlur={handleBlur}/>
                    {errors.email && touched.email &&
                     (<small className="invalid-feedback d-inline-block">{errors.email}</small>)
                      }
                 </div>
                 <div className="form-group">
                    <input type="password" className="form-control" name="password"
                   onChange={handleChange} onBlur={handleBlur}/>
                   {errors.password && touched.password &&
                    (<small className="invalid-feedback d-inline-block">{errors.password}</small>)
                    }
                 </div>
                 <button type="submit" className="btn btn-primary btn-block">login</button>
               </form>)
              }
            }
             </Form>
          </div>
       </div>
    );
  }
}
