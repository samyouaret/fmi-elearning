import React from 'react'

class Resource extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         data : this.props.data || {}
      }
   }
   getResourceName(){
      if (!this.state.data.url) {
         return "undefined resource";
      }
      let url = this.state.data.url.split("/")[3];

      return url.length < 21 ? url : url.substr(0,20) + "...";
   }
   render () {
     return(
        <li className="list-group-item d-flex  flex column justify-content-between align-items-center">
         <a href={this.state.data.url}  target="_blank">{this.getResourceName()}</a>
           <button onClick={this.props.onClick.bind(this.props.context,this.state.data.id)}
             className="btn btn-sm btn-secondary">delete</button>
       </li>)
   }
}

export default Resource;
