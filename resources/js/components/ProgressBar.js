import React,{Component} from "react"

class ProgressBar extends Component {
   constructor(props) {
      super(props);
      this.satte
   }
   render() {
      return this.props.value < 100 && this.props.value > -1 ?
      (<div className="progress w-100" style={this.props.style}>
       <div id={this.props.id} className="progress-bar bg-danger" role="progressbar"
          style={{width: this.props.value + "%"}}
       aria-valuenow={this.props.value} aria-valuemin="0" aria-valuemax="100"></div>
 </div>) : null;
   }
}
export default ProgressBar
