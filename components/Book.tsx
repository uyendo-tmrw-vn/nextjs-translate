import React from "react";

import HTMLFlipBook from "react-pageflip";

import styles from "styles/Book.module.css";

export default function Book() {
  return (
    <HTMLFlipBook
      width={300}
      height={500}
      maxShadowOpacity={0.5}
      className={styles.book}
      style={{}}
      startPage={0}
      size={"fixed"}
      minWidth={0}
      maxWidth={0}
      minHeight={0}
      maxHeight={0}
      drawShadow={false}
      flippingTime={0}
      usePortrait={false}
      startZIndex={0}
      autoSize={false}
      showCover={false}
      mobileScrollSupport={false}
      clickEventForward={false}
      useMouseEvents={false}
      swipeDistance={0}
      showPageCorners={false}
      disableFlipByClick={false}
    >
      <div className={styles.page}>Page 1</div>
      <div className={styles.page}>Page 2</div>
      <div className={styles.page}>Page 3</div>
      <div className={styles.page}>Page 4</div>
    </HTMLFlipBook>
  );
}
