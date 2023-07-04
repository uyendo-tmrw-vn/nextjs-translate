import React from "react";

import useTranslation from "utils/useTranslation";
import GuidelinesTabs from "components/GuidelinesTabs";

export default function GuidelinesTerm4() {
  const [t] = useTranslation();

  return (
    <GuidelinesTabs type="term">
      <ol>
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i}>{t(`term4_${i}`)}</li>
        ))}
      </ol>
    </GuidelinesTabs>
  );
}
