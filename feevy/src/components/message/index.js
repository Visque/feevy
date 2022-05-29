import React from 'react'

import styles from "./style.module.css"

export default function Message(props) {
  return (
    <>
        <div className={`${styles.container} ${props.variant} flex`} >
            {props.mssg}
        </div>
    </>
  )
}
