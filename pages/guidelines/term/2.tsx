import React from "react";

import useTranslation from "utils/useTranslation";
import GuidelinesTabs from "components/GuidelinesTabs";

export default function GuidelinesTerm2() {
  const [t] = useTranslation();

  return (
    <GuidelinesTabs type="term">
      <ol>
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i}>
            {t(`term2_${i}`)}
            {i === 4 && (
              <>
                <ol type="a">
                  <li>{t("term2_4_0")}</li>
                  <li>{t("term2_4_1")}</li>
                </ol>
                {t("term2_4_footer")}
              </>
            )}
          </li>
        ))}
      </ol>
    </GuidelinesTabs>
  );
}
