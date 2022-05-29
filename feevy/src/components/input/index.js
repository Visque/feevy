import React from "react";

import styles from "./style.module.css";

export default function Input(props) {
  return (
    <>
      <input
        onChange={props.onChange}
        className={styles.container}
        type={props.type || "text"}
        placeholder={props.placeholder}
        value={props.value || ""}
      />
    </>
  );
}
