import React from 'react'
import "./Button.css"

function Button(props) {
    const btnClass = `btn ${props.className}`
  return (
    <div>
      <button
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
        className={btnClass}
      >
        {props.children}
      </button>
    </div>
  );
}

export default Button