import React, {Component} from 'react'

import Course from './Course'
import request from '../helpers/request.js'
import Loading from '../components/Loading.js'
import Dialog from '../components/Dialog.js'
import Form from '../formcomponents/Form'
import Input from '../formcomponents/Input'
import DataProvider from '../providers/DataProvider'

// FIXME: bug null is converted as string "null"
// TODO: enhance validatoin (not accurate)

class HomeDashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         courses : [],
         errors : {},
         editing : false,
         auth : false,
         loading : false,
         search_term : null,
      }
      this.options={
         url : "/courses",
         method : "GET"
      }
      // this.searchMode = false;
      // this.updateCourses =  this.updateCourses.bind(this);
      this.loadCourses = (page=1,data,currentCourses)=>{
         this.setState({
            loading:true
         })
         request(this.options.url + '?page=' + page,data,this.options.method).done((message)=>{
            this.onSuccess(message,currentCourses);
         }).fail((jqXHR)=>{
            let message = jqXHR.responseJSON;
            this.setState({
               errors: message.errors || message.message || message
            })
         });
      };
      this.onSuccess = (message,currentCourses)=>{
         let result = message.data;
         let {data,...paginateData} = result;
         this.setState({
            courses :[...currentCourses,...data],
            auth : message.auth,
            paginateData : paginateData,
            loading : false
         })
      }
     this.validateSearch = (data)=>{
        return data && data.search_term && data.search_term.trim();
     }
     this.renderLoading = () => (<Loading/>);
     this.search = (data)=>{
        if (!this.validateSearch(data)) {
           console.log("not validate");
           return;
        }
        this.options.url = "/search";
        this.options.method = "POST";
        if (data.search_term) {
           this.loadCourses(1,data,[]);
           this.setState(data)
        }
     }
     this.handleClick = ()=>{
        let data = null;
        //empty search_term
        if (this.options.url == "/search") {
           data = {search_term : this.state.search_term};
           if (!this.validateSearch(data)) {
             return;
           }
        }
        let current_page = this.state.paginateData.current_page;
        this.loadCourses(current_page+1,data,this.state.courses);
     }
   }
   renderSearchResult(){
      if (this.state.paginateData && this.state.paginateData.total) {
      let total = this.state.paginateData.total;
      let plural = total == 1  ? total + " result" : total +" results";
      return (<h4 className="text-muted">{plural} found for
      <strong> {this.state.search_term}</strong></h4>)
      }
      return null;
   }
   render(){
      const courses = this.state.courses.map(function(course) {
           return <Course key={course.id} data={course}>
           </Course>;
      });
         let data = {search_term : this.state.search_term};
         let paginateData = this.state.paginateData;
         let loadBtn = paginateData && paginateData.next_page_url ?
         <button onClick={this.handleClick}
            className="btn btn-info my-2 align-self-center">load more</button> :
            null;
      return (
         <React.Fragment>
          <div className="container">
             <Form
               onSubmit={this.search}
             >
            {({values,handleChange,handleBlur,handleSubmit,errors,touched}) => {
             const handlers = {
                 onChange : handleChange,
                 onBlur : handleBlur
             }
             return (<form className="form-inline my-3" onSubmit={handleSubmit}>
                   <input name ="search_term" className="form-control mr-2 w-75" type="text"
                      placeholder="Search" onChange={handleChange} aria-label="Search"/>
                   <button className="btn btn-secondary">search </button>
                </form>)
             }}
           </Form>
           {this.renderSearchResult()}
         <DataProvider options={this.options}
            renderLoading={this.renderLoading}
             renderError={(error)=>{
                 return (<div className="alert alert-danger">{error.message}</div>)
             }}
             onSuccess={(message)=>this.onSuccess(message,[])}
          >
         <div className="row">
            {courses}
            </div>
            <div className="text-center">
               {this.state.loading && this.renderLoading()}
               {loadBtn}
            </div>
        </DataProvider>
        </div>
      </React.Fragment>
      )
   }
}
export default HomeDashboard
