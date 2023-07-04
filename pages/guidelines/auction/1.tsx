import React from "react";

import useTranslation from "utils/useTranslation";
import GuidelinesTabs from "components/GuidelinesTabs";
import Linkify from "react-linkify";

const contents = [4, 3];

export default function GuidelinesAuction1() {
  const [t] = useTranslation();

  return (
    <GuidelinesTabs type="auction">
      {contents.map((i, index) => (
        <h5>
          {t(`auction1_${index}`)}
          <p className="no-bold">
            <ol>
              {Array.from({ length: i }).map((_, contentIndex) => (
                <li key={index}>
                  {index === 1 && contentIndex === 0 ? (
                    <div className="link">
                      <Linkify>
                        {t(`auction1_${index}_${contentIndex}`)}
                      </Linkify>
                    </div>
                  ) : (
                    t(`auction1_${index}_${contentIndex}`)
                  )}
                </li>
              ))}
            </ol>
          </p>
        </h5>
      ))}
    </GuidelinesTabs>
  );
}
