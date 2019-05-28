require('../bootstrap');

import React, {Component} from 'react'
import {render} from 'react-dom'
import DataProvider from '../providers/DataProvider'
import Form from './Form'

class Test extends Component{
   constructor(props){
      super(props)
   }
   updateError(error){
      this.setState(()=>({
       error :error
      }))
   }
   render(){
      const options = [{
         url : "/instructor/1",
         method:"GET",
         contentType: 'application/json',
      },
         {
            url : "/instructor/languages",
            method:"GET",
            contentType: 'application/json',
         },
         {
            url : "/instructor/1",
            method:"put",
            contentType: 'application/json',
            headers: {
               'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
          }
   ]
      return(
         <DataProvider options={options}
            renderLoading={()=>{
               return (<div className="d-flex justify-content-center">
                       <div className="spinner-border" role="status">
                         <span className="sr-only">Loading...</span>
                       </div>
                     </div>)
            }}
            renderError={(error)=>{
               // this.updateError(error);
               return (<div className="alert alert-danger">{error.message}</div>)
            }}
            Onsuccess={(data)=>{
               this.setState({
                  data : data
               })
            }}
            OnError={(error)=>{
               this.setState({
                  error : error
               })
            }}
            >
            {(data,error,refersh)=>{
               console.log(error);
               return (
                  <div className="card">
                     <div className="card-header text-center">Login</div>
                     <div className="card-body">
                        <Form
                           initialValues={data[0]}
                           initialErrors={error.errors}
                           onSubmit={values=>{
                           alert(JSON.stringify(values,null,2))
                        }}
                        validate={this.validate}>
                        { ({values,handleChange,handleBlur,handleSubmit,errors,touched}) => {
                           console.log(errors);
                         return (
                            <form onSubmit={handleSubmit}>
                            <div className="form-group">
                               <input type="text" className="form-control" name="title"
                                  value={values.title}
                               onChange={handleChange} onBlur={handleBlur}/>
                               {errors.title && touched.title &&
                                (<small className="invalid-feedback d-inline-block">{errors.title[0]}</small>)
                                 }
                            </div>
                            <div className="form-group">
                               <textarea type="text" rows="5" className="form-control" name="description"
                              value={values.description} onChange={handleChange} onBlur={handleBlur}/>
                              {errors.description && touched.description &&
                               (<small className="invalid-feedback d-inline-block">{errors.description}</small>)
                               }
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">login</button>
                          </form>)
                         }
                       }
                        </Form>
                     </div>
                  </div>
              )
            }}
         </DataProvider>
      )
   }
}
if (document.getElementById('app')) {
    render(<Test />, document.getElementById('app'));
}
export default Test
