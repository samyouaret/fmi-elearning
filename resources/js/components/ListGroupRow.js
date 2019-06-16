import React, {Component} from 'react'

export default function ListGroupRow(props) {
   let image = null;
   if (props.image) {
      image = <img  style={{maxWidth:"50px"}}src={props.image}/>
   }
     return (<li className={"list-group-item d-flex justify-content-between " + props.active}
     style={{cursor:"pointer"}}
     onClick={props.onClick}>
     {image}
     <span className="d-flex flex-column">
       <strong>{props.title}</strong>
       <span className={"text-muted" + props.active}>{props.subTitle}</span>
     </span>
     <span>
        {props.children}
     </span>
  </li>)
}
