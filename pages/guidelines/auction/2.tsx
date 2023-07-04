import React from "react";

import useTranslation from "utils/useTranslation";
import GuidelinesTabs from "components/GuidelinesTabs";

const contents = [1, 13, 2];

export default function GuidelinesAuction2() {
  const [t] = useTranslation();

  return (
    <GuidelinesTabs type="auction">
      {contents.map((i, index) => (
        <h5>
          {t(`auction2_${index}`)}
          <p className="no-bold">
            {i > 1 ? (
              <ol>
                {Array.from({ length: i }).map((_, contentIndex) => (
                  <li key={index}>
                    {t(`auction2_${index}_${contentIndex}`)}
                    {/* {index === 1 && contentIndex === 3 && (
                      <div className="imgbox">
                        <img className="center-fit" src="/platform_4.png" />
                      </div>
                    )} */}
                    {/* auction2_1_2_x (no 3 platform) */}
                    {index === 1 && contentIndex === 2 && (
                      <ol type="a">
                        <li>{t("auction2_1_2_0")}</li>
                        <li>{t("auction2_1_2_1")}</li>
                        <li>{t("auction2_1_2_2")}</li>
                        <li>{t("auction2_1_2_3")}</li>
                        <li>{t("auction2_1_2_4")}</li>
                        <li>{t("auction2_1_2_5")}</li>
                        <li>{t("auction2_1_2_6")}</li>
                        <li>{t("auction2_1_2_7")}</li>
                      </ol>
                    )}
                    {/* {index === 1 && contentIndex === 5 && (
                      <ol type="a">
                        <li>
                          {t("auction2_1_5_0")}
                          <div className="imgbox">
                            <img
                              className="center-fit"
                              src="/platform_6_a.png"
                              style={{
                                maxHeight: "180px",
                              }}
                            />
                          </div>
                        </li>
                        <li>
                          {t("auction2_1_5_1")}
                          <div className="imgbox">
                            <img
                              className="center-fit"
                              src="/platform_6_b.png"
                              style={{ maxHeight: "600px" }}
                            />
                          </div>
                        </li>
                      </ol>
                    )}
                    {index === 1 && contentIndex === 10 && (
                      <div className="imgbox">
                        <img
                          className="center-fit"
                          src="/platform_11.png"
                          style={{
                            maxHeight: "144px",
                          }}
                        />
                      </div>
                    )} */}
                  </li>
                ))}
              </ol>
            ) : (
              t(`auction2_${index}_0`)
            )}
          </p>
        </h5>
      ))}
    </GuidelinesTabs>
  );
}
