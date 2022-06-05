import React, { memo } from 'react'
import { Box } from "@mui/system";

function Home(props) {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "aliceblue",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "aliceblue",
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

export default memo(Home)
