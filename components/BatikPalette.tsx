import React from "react";

import styles from "styles/BatikPalette.module.css";

interface BatikPaletteProps {
  src: string;
  className?: string;
}

function BatikPalette({ src, className }: BatikPaletteProps) {
  return (
    <div className={`${className} ${styles.palette}`}>
      <img src={src} alt="" />
    </div>
  );
}
export default BatikPalette;
