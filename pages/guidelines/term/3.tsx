import React from "react";

import useTranslation from "utils/useTranslation";
import GuidelinesTabs from "components/GuidelinesTabs";

export default function GuidelinesTerm3() {
  const [t] = useTranslation();

  return (
    <GuidelinesTabs type="term">
      <ol>
        {Array.from({ length: 7 }).map((_, i) => (
          <li key={i}>{t(`term3_${i}`)}</li>
        ))}
      </ol>
    </GuidelinesTabs>
  );
}
