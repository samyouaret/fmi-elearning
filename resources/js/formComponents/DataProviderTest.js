require('../bootstrap');

import React, {Component} from 'react'
import {render} from 'react-dom'
import DataProvider from '../providers/DataProvider'
class Test extends Component{
   constructor(props){
      super(props)
   }
   render(){
      const options = {
         url : "/instructor/subjects",
         method:"GET",
         contentType: 'application/json',
      }
      return(
         <DataProvider options={options}
            onLoading={()=>{
               return (<div className="alert alert-warning">loading...</div>)
            }}
            onError={(error)=>{
               return (<div className="alert alert-danger">{error.message}</div>)
            }}
            >
            {(data,refersh)=>{
               return (
                  <div className="card">
                  <div className="card-header">{data[0].label}</div>
                  <div className="card-body">
                      <p>some text goes here</p>
                     <button className="btn btn-light" onClick={refersh}>refersh</button>
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
