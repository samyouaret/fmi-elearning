import React, {Component} from 'react'

export default function(props) {
     return (<li className="list-group-item d-flex justify-content-between">
     <span className="d-flex flex-column">
       <strong>{props.title}</strong>
       <span className="text-muted">{props.subTitle}</span>
     </span>
     <span>
        {props.children}
     </span>
  </li>)
}
