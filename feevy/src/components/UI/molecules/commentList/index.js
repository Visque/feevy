import React, { memo } from "react";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

function CommentList(props) {
  const { postComments } = props;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "500px",
          overflowY: "auto",
        }}
      >
        {postComments.length != 0 ? (
          postComments.map((comment, idx) => {
            return (
              <Box
                key={idx}
                sx={{
                  borderRadius: "10px",
                  padding: "5px 10px",
                  display: "flex",
                  flexDirection: "column",
                  m: "5px 0",
                  backgroundColor: "aliceblue",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h7"
                    sx={{
                      padding: "5px 0",
                      height: "auto",
                    }}
                  >
                    {comment.postedBy.userName}
                  </Typography>
                  <Typography
                    variant="h7"
                    sx={{
                      padding: "5px 0",
                      height: "auto",
                    }}
                  >
                    {comment.createdAt}
                  </Typography>
                </Box>
                <Box
                  key={idx}
                  sx={{
                    backgroundColor: "whitesmoke",
                    color: "grey",
                  }}
                >
                  <Typography
                    variant="h7"
                    sx={{
                      padding: "5px 0",
                      height: "auto",
                    }}
                  >
                    {comment.message}
                  </Typography>
                </Box>
              </Box>
            );
          })
        ) : (
          <Box
            sx={{
              m: "10px 0",
            }}
          >
            <Typography
              variant="h7"
              sx={{
                padding: "5px 0",
                height: "auto",
              }}
            >
              No comments..
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}

export default memo(CommentList)
