import React from "react";

import styles from "styles/RatingStar.module.css";

export type RatingOptions = 0 | 1 | 2 | 3 | 4 | 5;

interface RatingStarsProps {
  rating: RatingOptions;
}

function RatingStars({ rating }: RatingStarsProps) {
  return (
    <div className={styles.root}>
      {Array.from({ length: rating }).map((_, e) => (
        <img key={e} src="/star_solid.svg" />
      ))}
      {Array.from({ length: 5 - rating }).map((_, e) => (
        <img key={e} src="/star_blank.svg" />
      ))}
    </div>
  );
}
export default RatingStars;
