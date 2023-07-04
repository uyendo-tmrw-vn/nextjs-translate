import React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "components/IconButton";
import Button from "components/Button";
import styles from "styles/About.module.css";
import Layout from "components/Layout";
import useTranslation from "utils/useTranslation";

export default function About() {
  const [t] = useTranslation();

  return (
    <Layout>
      <div>
        <div>
          <Grid container className={styles.header}>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <header>
                <p>{t("about_intro")}</p>
                <div>
                  <Grid container className={styles.benefitContainer}>
                    <Grid item xs={8} md={9}>
                      <h3>{t("about_header")}</h3>
                    </Grid>
                    <Grid item xs={4} md={3} className={styles.benefits}>
                      <ul>
                        <li>{t("benefit1")}</li>
                        <li>{t("benefit2")}</li>
                        <li>{t("benefit3")}</li>
                      </ul>
                    </Grid>
                  </Grid>
                </div>
                <div className={styles.video}>
                  <a href="https://youtu.be/bo9tjBGbXxQ" target="_blank">
                    <IconButton src="/play_square.svg" />
                  </a>
                  <p>
                    {/* {t("about_video_text")} */}
                    <a href="https://youtu.be/bo9tjBGbXxQ" target="_blank">
                      {t("watchteaser")}
                    </a>
                  </p>
                </div>
                <div className={styles.imageHeader} />
              </header>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </div>
        <div>
          <Grid container className={styles.more}>
            <Grid item xs={1} />
            <Grid item container xs={10}>
              <Grid
                item
                xs={12}
                className={`${styles.register} ${styles.top}`}
                component={Box}
                display={{ xs: "block", md: "none" }}
              >
                <b className="secondary">{t("moreabout")}</b>
                <h4>{t("moreabout_title")}</h4>
                <Button color="transparent" outline>
                  <p>{t("registernow").toUpperCase()}</p>
                </Button>
              </Grid>
              <Grid item xs={12} md={5}>
                <p>{t("about_footer1")}</p>
                <br />
                <p>{t("about_footer2")}</p>
              </Grid>
              <Grid
                item
                xs={2}
                component={Box}
                display={{ xs: "none", md: "block" }}
              />
              <Grid
                item
                xs={5}
                className={`${styles.register} ${styles.bottom}`}
                component={Box}
                display={{ xs: "none", md: "block" }}
              >
                <b className="secondary">{t("moreabout")}</b>
                <h4>{t("moreabout_title")}</h4>
                <a href="https://bit.ly/RegNarauction_tac2" target="_blank">
                  <Button color="transparent" outline>
                    <p>{t("registernow").toUpperCase()}</p>
                  </Button>
                </a>
              </Grid>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </div>
      </div>
    </Layout>
  );
}
