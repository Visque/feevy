import React from 'react'

import styles from "./style.module.css"

export default function Button(props) {
  return (
    <>
        <button type={props.type} className={`${props.variant} btn`} onClick={props.onClick}  > {props.value} </button>
    </>
  )
}
