import React from "react";

import styles from "styles/IconButton.module.css";

interface IconButtonProps {
  src: string;
  backgroundColor?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "white"
    | "transparent";
  color?: "black" | "white";
  size?: "normal" | "small";
  outline?: string;
  noShadow?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function IconButton(props: IconButtonProps) {
  const {
    src,
    backgroundColor = "primary",
    color = "white",
    size = "normal",
    outline,
    onClick,
    noShadow,
  } = props;

  return (
    <button
      onClick={onClick}
      className={`${styles[backgroundColor]} ${styles.button} ${
        styles[size]
      }  ${styles[color]} ${outline ? styles.outline : ""} ${
        noShadow ? "" : styles.shadows
      }`}
    >
      <img src={src} alt="" />
    </button>
  );
}

export default IconButton;
