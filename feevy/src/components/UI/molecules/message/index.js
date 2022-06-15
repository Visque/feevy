import React, { memo } from 'react'
import { Box } from '@mui/material'

import styles from "./style.module.css"

function Message(props) {
  return (
    <>
        <Box className={`${styles.container} ${props.variant} flex`} >
          {props.mssg}
        </Box>
    </>
  )
}

export default memo(Message)