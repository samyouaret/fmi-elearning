import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import request from '../helpers/request.js'
import findByAttr from '../helpers/findByAttr.js'
import filterByAttr from '../helpers/filterByAttr.js'
import Loading from '../components/Loading.js'

export default class DataPager extends Component{
   constructor(props){
      super(props)
      this.state = {
         errors : null,
         data : [],
         isLoaded : false,
         url  : this.props.url,
         searchUrl : this.props.searchUrl,
         loadType : 0,
         paginateData :{},
         search_term : null
      }
      //to avoid a request
      this.oldData = null;
      this.loadMore = ()=> {
        if (this.state.hasNext) {
           this.load(this.state.paginateData.current_page+1,this.state.data);
        }
      }
      this.reset = ()=> {
            this.normalLoad();
      }
      this.load = (page=1,currentData)=>{
         // this.setState({
         //    isLoaded:false
         // })
         request(this.options.url + '?page=' + page,this.options.data,this.options.method).
         done((message)=>{
            this.oldData = null;
            let result  = message
            this.success(result,currentData);
         }).fail((jqXHR)=>{
            let message = jqXHR.responseJSON;
            this.setState({
               errors: message.errors || message.message || message
            })
         });
      };
      this.success = (message,currentData)=>{
         let {data,...paginateData} = message;
         this.setState({
            data :[...currentData,...data],
            paginateData : paginateData,
            isLoaded :true,
            hasNext : paginateData && paginateData.next_page_url !==null,
         })
      }
      this.search = (search_term)=>{
         if (!search_term) {
            this.normalLoad();
            return;
         }
         this.options.url = this.state.searchUrl;
         this.options.method = "POST";
         this.options.data = {search_term};
         this.load(1,[]);
      }
      this.filter= ({attr,value})=>{
         if (!this.oldData) {
            this.oldData = JSON.parse(JSON.stringify(this.state.data))
         }
         if (!value) {
            this.setState({
              data : this.oldData
            })
            return;
         }
         // let data = JSON.parse(JSON.stringify(this.state.data))
         let result = filterByAttr(this.oldData,attr,value);
            this.setState({
               data : result
            })
      }
    this.normalLoad = ()=>{
      this.options ={
          url : this.state.url,
          method : 'GET',
          data :null
      };
      this.load(1,[]);
   }
   }
   componentDidMount(){
      this.normalLoad();
   }
   render(){
     const {errors, isLoaded, data} = this.state;
     if (errors) {
        // return  this.renderError(errors);
        return null
     }else if (!isLoaded) {
      return <Loading/>;
     }else{
         return this.props.children && this.props.children.constructor.name == "Function" ?
         this.props.children(data,this.loadMore,
            {paginateData:this.state.paginateData,hasNext:this.state.hasNext},
            this.search,this.filter,this.reset) :
            this.props.children || null;
     }
   }
}
