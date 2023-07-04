import React from "react";

import GuidelinesHeader from "components/GuidelinesHeader";
import Grid from "@mui/material/Grid";

import styles from "styles/Guidelines.module.css";
import TabLinks from "components/TabLinks";
import Layout from "components/Layout";
import useTranslation from "utils/useTranslation";

interface GuidelinesTabsProps {
  type: "auction" | "term";
  children: React.ReactNode;
}

const GuidelinesTabs = ({ type, children }: GuidelinesTabsProps) => {
  const [t] = useTranslation();

  return (
    <Layout>
      <Grid container>
        <GuidelinesHeader />
        <Grid item xs={1} />
        <Grid item xs={10}>
          <main className={styles.root}>
            <TabLinks
              className={styles.tabs}
              items={[
                {
                  label: t(`${type}_tab1`),
                  href: `/guidelines/${type}/1`,
                },
                {
                  label: t(`${type}_tab2`),
                  href: `/guidelines/${type}/2`,
                },
                {
                  label: t(`${type}_tab3`),
                  href: `/guidelines/${type}/3`,
                },
                ...(type === "term"
                  ? [
                      {
                        label: t(`${type}_tab4`),
                        href: `/guidelines/${type}/4`,
                      },
                    ]
                  : []),
              ]}
            />
            {children}
          </main>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Layout>
  );
};

export default GuidelinesTabs;
