import React, { memo } from 'react'
import { Box } from "@mui/system";

function Auth(props) {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#0E2A36",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
            {props.children}
        </Box>
      </Box>
    </>
  );
}

export default memo(Auth)
