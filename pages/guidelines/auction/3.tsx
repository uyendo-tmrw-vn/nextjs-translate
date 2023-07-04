import React from "react";

import useTranslation from "utils/useTranslation";
import GuidelinesTabs from "components/GuidelinesTabs";

const contents = [6, 4];

export default function GuidelinesAuction3() {
  const [t] = useTranslation();

  return (
    <GuidelinesTabs type="auction">
      <p>{t("auction3_intro")}</p>
      {contents.map((i, index) => (
        <h5>
          {t(`auction3_${index}`)}
          <p className="no-bold">
            <ol>
              {Array.from({ length: i }).map((_, contentIndex) => (
                <li key={index}>{t(`auction3_${index}_${contentIndex}`)}</li>
              ))}
            </ol>
          </p>
        </h5>
      ))}
    </GuidelinesTabs>
  );
}
