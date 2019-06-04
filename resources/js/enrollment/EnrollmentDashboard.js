import React, {Component} from 'react'
import request from '../helpers/request.js'
import Dialog from '../components/Dialog.js'
import Sidebar from '../components/Sidebar'
import Video from './Video'
import WrapperContent from '../components/WrapperContent'

class EnrollmentDashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
   // componentDidMount will not work because id conditional rendering
   getCourseId(){
    return location.pathname.split("/")[2];
   }

   render(){
      return (
         <div className="row justify-content-end" style={{minHeight:500 + "px"}}>
             <Sidebar>
               <div className="list-group">
                  <li className="list-group-item">Cras justo odio</li>
                 <li className="list-group-item">Dapibus ac facilisis in</li>
               </div>
             </Sidebar>
             <WrapperContent>
                <Video url="file:///home/samy/Documents/untitled.mp4"/>
             </WrapperContent>
         </div>
      )
   }
}
export default EnrollmentDashboard
