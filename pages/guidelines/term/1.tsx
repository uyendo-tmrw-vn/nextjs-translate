import React from "react";

import useTranslation from "utils/useTranslation";
import GuidelinesTabs from "components/GuidelinesTabs";

export default function GuidelinesTerm1() {
  const [t] = useTranslation();

  return (
    <GuidelinesTabs type="term">
      <ol>
        {Array.from({ length: 11 }).map((_, i) => (
          <li key={i}>{t(`term1_${i}`)}</li>
        ))}
      </ol>
    </GuidelinesTabs>
  );
}
