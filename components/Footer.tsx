import React, { useState } from "react";

import Grid from "@mui/material/Grid";

import styles from "styles/Footer.module.css";
import Link from "next/link";
import IconButton from "./IconButton";
import Button from "./Button";
import TextInput from "./TextInput";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleEmail = (input: string) => setEmail(input);

  return (
    <footer className={styles.footer}>
      <button className={styles.scrollToTop} onClick={handleScrollToTop}>
        <img src="/up.svg" />
      </button>
      <Grid container>
        <Grid item xs={1} />
        <Grid container item xs={10}>
          <Grid item className={styles.logoContainer} xs={12}>
            <img src="/logo_light.svg" alt="" />
          </Grid>
          <Grid
            item
            className={`${styles.centerContainer} ${styles.contact}`}
            xs={12}
            md={6}
            lg={8}
          >
            <table>
              <tr>
                <td>
                  <img src="/location.svg" alt="" className="icon" />
                </td>
                <td>St. Imam Bonjol No. 207, Semarang City, 50131</td>
              </tr>
              <tr>
                <td>
                  <img src="/phone.svg" alt="" className="icon" />
                </td>
                <td>0851 6141 6104</td>
              </tr>
              <tr>
                <td>
                  <img src="/location.svg" alt="" className="icon" />
                </td>
                <td>support@naratik.com</td>
              </tr>
            </table>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={6}
            lg={4}
            className={styles.subscribe}
          >
            <Grid item className={styles.centerContainer} xs={12}>
              <h5>Subscribe to Narauction</h5>
              <p>To get more information for Auction</p>
            </Grid>
            <Grid item xs={12} md={7} className={styles.centerContainer}>
              <TextInput
                outline
                onChange={handleEmail}
                type="email"
                placeholder="Your Email Address..."
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={12} md={4} className={styles.centerContainer}>
              <Button color="disabled" outline>
                <b>Subscribe</b>
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            // className={styles.centerContainer}
            xs={12}
            className={styles.iconBar}
            sx={{ my: "24px" }}
          >
            <a href="https://www.linkedin.com/company/naratik" target="_blank">
              <IconButton
                backgroundColor="transparent"
                size="small"
                src="/linkedin.svg"
              />
            </a>
            <a href="https://www.instagram.com/naratik.id/" target="_blank">
              <IconButton
                backgroundColor="transparent"
                size="small"
                src="/instagram.svg"
              />
            </a>
            <a href="https://www.facebook.com/naratik.official" target="_blank">
              <IconButton
                backgroundColor="transparent"
                size="small"
                src="/facebook.svg"
              />
            </a>
          </Grid>
          <Grid
            item
            xs={12}
            className={`${styles.bottomContainer} ${styles.mainContainer}`}
          >
            <div className={styles.mainContainer}>
              <Link href="/guidelines/term/1">Terms & Condition</Link>
            </div>
            <p>Copyright © 2021 Naratik</p>
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </footer>
  );
}
