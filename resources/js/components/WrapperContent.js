import React,{Component} from "react"

export default function WrapperContent(props){
      return (
     <div className="col-md-8 position-relative"  style={{minHeight:500 + "px"}}>
           {props.children}
        </div>
      )
}
