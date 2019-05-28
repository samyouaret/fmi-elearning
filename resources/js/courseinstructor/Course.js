import React, {Component} from 'react'

class Course extends Component {
  render(){
     let status = null;
     if (this.props.status==0) {
        status = <span className="badge badge-warning badge-pill m-1 text-gray"> draft</span>
     }
     console.log(status);
    return (
     <div className="card">
      <div className="card-body">
      <h3 className="card-title">
      {this.props.title}
      {status}
      </h3>
       <p>{this.props.description}</p>
       <a className="btn btn-secondary" href={"/instructor/" + this.props.id  + "/edit"}>continue</a>
      </div>
     </div>
    );
  }
}
export default Course
