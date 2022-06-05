import React, { memo } from 'react'

import styles from "./style.module.css"

function Message(props) {
  return (
    <>
        <div className={`${styles.container} ${props.variant} flex`} >
          {props.mssg}
        </div>
    </>
  )
}

export default memo(Message)