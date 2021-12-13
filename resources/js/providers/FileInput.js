import React, { Component } from 'react';

export default class FileInput extends Component {
   constructor(props){
      super(props);
   }
  render() {
     let {children,...props} = this.props;
     return  (
        <div className="form-group">
          <div className="custom-file">
            <input type="file" {...props} className="custom-file-input"/>
            <label className="custom-file-label" htmlFor="profile_image">Choose {props.name} image...</label>
          </div>
          {children}
        </div>
    )
  }
}
