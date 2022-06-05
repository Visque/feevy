import React, { memo } from "react";

function Notification() {
  let content = (
      <div>notifications</div>
  );

  return (
    <>
      <div>{content}</div>
    </>
  );
}

export default memo(Notification)
