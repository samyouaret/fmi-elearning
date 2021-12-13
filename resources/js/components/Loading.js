import React,{Component} from "react"

class Loading extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      return (<div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>)
   }
}
export default Loading
