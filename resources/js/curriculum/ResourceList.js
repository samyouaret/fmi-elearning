import React from 'react'
import Resource from './Resource'

class ResourceList extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         list :  this.props.list || [],
      }
   }
   static getDerivedStateFromProps(props,state){
      return {
         list : props.list
      }
   }
   findResourceById(id){
      let pos = -1;
      for (var i = 0; i < this.state.list.length; i++) {
         if (this.state.list[i].id ==id) {
            pos = i;
            break;
         }
      }
      return pos;
   }
   delete(id){
     let pos  = this.findResourceById(id);
      this.state.list.splice(pos,1);
      this.setState({
         list : this.state.list
      })
   }
   renderList(){
      let list = null;
      if(this.state.list.length==0){
         list = (<h5 className="m-2 text-secondary text-center">no resource is found.</h5>)
      }else{
         list = this.state.list.map((res)=>{
            return (
               <Resource context={this.props.context} onClick={this.props.onClick} data={res} key={res.id} delete={this.delete.bind(this,res.id)}/>
            )
         });
      }
      return (
      <ul className="list-group border p-2">
       <h4 className="mb-1">{this.props.title}</h4>
      {list}
    </ul>)
   }
   render () {
      return this.renderList();
   }
}

export default ResourceList;
