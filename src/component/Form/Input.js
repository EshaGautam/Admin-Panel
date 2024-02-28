import React from 'react'
import "./Input.css"
function Input(props) {
  return (
    <div className="input-style">
      <label htmlFor={props.id}>{props.name} </label>
      <input type={props.type} id={props.id} onChange={props.onChange} className={`input-cmp ${props.className}`} placeholder={props.placeholder} disabled={props.disabled} min={props.min} max={props.max} required>
        {props.children}
      </input>
    </div>
  );
}

export default Input