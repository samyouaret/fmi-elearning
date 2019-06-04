import React,{Component} from "react"

export default function Sidebar(props){
      return (
        <div className="col-md-4 flex-column align-items-baseline"
           style={{flex:1}}>
           {props.children}
        </div>
      )
}
