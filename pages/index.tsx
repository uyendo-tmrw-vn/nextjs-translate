import React, { useEffect, useRef, useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "components/Button";
import BatikPalette from "components/BatikPalette";

import styles from "styles/Home.module.css";
import IconButton from "components/IconButton";
import Layout from "components/Layout";
import axios from "axios";
import { UpcomingEvent } from "utils/types";
import moment from "moment";
import useTranslation from "utils/useTranslation";
import { Slide } from "react-slideshow-image";
import Link from "next/link";
import CustomSlider from "components/CustomSlider";
// import RatingStars, { RatingOptions } from "components/RatingStars";

const slides = [
  {
    src: "/about_friendly.svg",
    titleEn: "Live online auction",
    titleId: "Live online auction",
    descEn:
      "The auction is conducted LIVE online, which bidder can access anytime and anywhere",
    descId:
      "Lelang dilakukan secara LIVE online yang dapat diakses kapanpun dan dimanapun",
  },
  {
    src: "/about_support.svg",
    titleEn: "Validated by curator",
    titleId: "Tervalidasi kurator",
    descEn:
      "Ancient batik that will be auctioned has been curated and guaranteed 100% authenticity",
    descId:
      "Batik kuno yang akan dilelang telah terkurasi dan dijamin 100% keaslian nya.",
  },
  {
    src: "/about_misc.svg",
    titleEn: "Exclusive and rare artwork",
    titleId: "Eksklusif dan langka",
    descEn:
      "Get an exclusive, rare, and limited collection of ancient batik only at Narauction",
    descId:
      "Dapatkan segera koleksi batik kuno yang eksklusif, langka, dan terbatas hanya di Narauction",
  },
  {
    src: "/about_misc.svg",
    titleEn: "Meaningful",
    titleId: "Penuh makna",
    descEn:
      "Each batik has a story and a deep meaning poured by the batik artisan",
    descId:
      "Tiap batik memiliki kisah dan makna yang mendalam yang dituangkan oleh pengrajin batiknya",
  },
];

const testimonials = [
  {
    name: "Nama 1",
    city: "Semarang",
    description: "Description 1",
    imgUrl:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  {
    name: "Nama 2",
    city: "Jakarta",
    description: "Description 2",
    imgUrl:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  {
    name: "Nama 3",
    city: "Bandung",
    description: "Description 3",
    imgUrl:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  {
    name: "Nama 4",
    city: "Bekasi",
    description: "Description 4",
    imgUrl:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
];

export default function Home() {
  const [upcomingEvent, setUpcomingEvent] = useState<
    UpcomingEvent | undefined
  >();
  const [eta, setEta] = useState("");
  const [t, currentLang] = useTranslation();
  const sliderRef = useRef<any>(null);

  const handleNext = () => sliderRef.current.goNext();
  const handlePrev = () => sliderRef.current.goBack();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get<UpcomingEvent>(
        "https://narauction.et.r.appspot.com/event/upcoming"
      );
      console.log(data);

      setUpcomingEvent(data);
      setInterval(() => {
        const eta = moment
          .duration(moment(data.event.date).diff(moment()))
          .asDays();

        let day = eta;
        day = Math.floor(day);

        setEta(`${day}`);
      }, 1000);
    };

    fetch();
  }, []);

  return (
    <Layout>
      <div>
        <div className={styles.root}>
          {upcomingEvent && (
            <Grid container>
              <Grid item xs={1} />
              <Grid item xs={10}>
                <header
                  className={styles.header}
                  style={{
                    background: `linear-gradient(
                  90deg,
                  rgba(53, 46, 31, 0.8) 0%,
                  rgba(53, 46, 31, 0) 100%
                ),
                url(${
                  upcomingEvent.event.foto[0] ?? "/bg_home_header.png"
                }) center/cover`,
                  }}
                >
                  <h1>{upcomingEvent.event.name}</h1>
                  <Grid container className={styles.subtitleBar}>
                    <Grid container item xs={12} md={7} lg={8} xl={9}>
                      <Grid item xs={12}>
                        <p className={styles.subtitle}>
                          {
                            {
                              id: upcomingEvent.event.descId,
                              en: upcomingEvent.event.descEn,
                            }[currentLang]
                          }
                        </p>
                      </Grid>
                      <Grid container item xs={12}>
                        <div className={styles.buttonBar}>
                          <a
                            href="https://bit.ly/RegNarauction_tac2"
                            target="_blank"
                          >
                            <Button outline className={styles.button}>
                              <img
                                src="/bid.svg"
                                alt=""
                                className={styles.icon}
                              />
                              {t("bidnow")}
                            </Button>
                          </a>
                          <Link href="/catalog#lots" passHref>
                            <Button
                              outline
                              color="transparent"
                              className={styles.button}
                            >
                              <img
                                src="/list.svg"
                                alt=""
                                className={styles.icon}
                              />
                              {t("alllots")}
                            </Button>
                          </Link>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={5} lg={4} xl={3}>
                      {upcomingEvent.fotoItem && (
                        <div className={styles.paletteContainer}>
                          <BatikPalette
                            className={styles.palette5}
                            src="/icon_others.svg"
                          />
                          {upcomingEvent.fotoItem
                            .filter((_, i) => i < 4)
                            .map((src, index) => {
                              const i = 4 - index;
                              return (
                                <BatikPalette
                                  key={src}
                                  className={styles[`palette${i}`]}
                                  src={src}
                                />
                              );
                            })}
                        </div>
                      )}
                    </Grid>
                  </Grid>

                  <div className={styles.countdown}>
                    <div className={styles.subcontainer}>
                      <img
                        src="/stopwatch.svg"
                        alt=""
                        className={`${styles.icon} icon`}
                      />
                      <b>
                        {eta} {t("day(s)")}
                      </b>
                    </div>
                    <div className={`${styles.divider} ${styles.left}`} />
                    <p className={styles.lotCount}>
                      {upcomingEvent.itemCount} Lots
                    </p>
                    <div className={`${styles.divider} ${styles.right}`} />
                    <div className={styles.subcontainer}>
                      <img
                        src="/broadcast.svg"
                        alt=""
                        className={`${styles.icon} icon`}
                      />
                      <p>
                        LIVE auction{" "}
                        {moment(upcomingEvent.event.date).format(
                          "dddd, D MMMM y"
                        )}
                      </p>
                    </div>
                  </div>
                </header>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          )}
          <main>
            <div className={styles.collab} />
            <Grid container component="section" className={styles.videoSection}>
              <Grid item xs={1} />
              <Grid item container xs={10} spacing={0}>
                {/* <div className={styles.videoContainer}> */}
                <Grid
                  item
                  xs={12}
                  sm={0}
                  className={`${styles.videoPreview} ${styles.left}`}
                />
                <Grid item xs={12} sm={12} md={6} className={styles.feature}>
                  <div className={styles.no1}>
                    <img src="/star.svg" />
                    {t("home_main_sub")}
                  </div>
                  <h3>{t("home_main_header")}</h3>
                  <p>{t("home_main_desc")}</p>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={0}
                  md={6}
                  className={`${styles.videoPreview} ${styles.right}`}
                />
                {/* </div> */}
              </Grid>
              <Grid item xs={1} />
            </Grid>
            <Grid container item xs={12} className={styles.slides}>
              <Grid item xs={1} />
              <Grid item xs={10} md={3} lg={2}>
                <p>{t("home_slider_caption")}</p>
                <h3>{t("home_slider_title")}</h3>
                <div className={styles.buttonBar}>
                  <IconButton
                    onClick={handlePrev}
                    src="/about_prev.svg"
                    backgroundColor="transparent"
                  />
                  <IconButton
                    onClick={handleNext}
                    src="/about_next.svg"
                    backgroundColor="transparent"
                  />
                </div>
              </Grid>
              <Grid item xs={1} />
              <Grid
                item
                xs={1}
                component={Box}
                display={{ xs: "block", md: "none" }}
              />
              <Grid item xs={10} md={7} lg={8} className={styles.slider}>
                <div className="slide-container">
                  <Slide
                    ref={sliderRef}
                    easing="ease-out"
                    slidesToShow={2}
                    arrows={false}
                    transitionDuration={600}
                  >
                    {slides.map((slide, index) => (
                      <div className={styles.sliderItem} key={index}>
                        <img src={slide.src} />
                        <b className="large">
                          {currentLang === "en" ? slide.titleEn : slide.titleId}
                        </b>
                        <p>
                          {currentLang === "en" ? slide.descEn : slide.descId}
                        </p>
                      </div>
                    ))}
                  </Slide>
                </div>
              </Grid>
              <Grid
                item
                xs={1}
                component={Box}
                display={{ xs: "block", sm: "none" }}
              />
            </Grid>
            <Grid container>
              <Grid item xs={1} />
              <Grid
                item
                xs={10}
                className={styles.galleryGrid}
                style={{ marginTop: "96px" }}
              >
                <img src="/gk1.png" alt="" />
                <div className={styles.galleryText}>
                  <h3>{t("gallery")}</h3>
                  <p>The Ancient Collection Vol. 1</p>
                </div>
              </Grid>
              <Grid item xs={1} />
            </Grid>
            {/*<Grid container component="section" className={styles.testimonials}>*/}
            {/*  <Grid item xs={1} />*/}
            {/*  <Grid item xs={10}>*/}
            {/*    <h3 className="center">Testimonials</h3>*/}
            {/*    <CustomSlider className={styles.slider}>*/}
            {/*      {testimonials.map((testi, e) => (*/}
            {/*        <div key={e}>*/}
            {/*          <img className={styles.quote} src="/quote.svg" alt="" />*/}
            {/*          <div className={styles.sliderContent}>*/}
            {/*            /!* <RatingStars rating={(5 - e) as RatingOptions} /> *!/*/}
            {/*            <img src={testi.imgUrl} alt="" />*/}
            {/*            <h6>*/}
            {/*              {testi.name} - {testi.city}*/}
            {/*            </h6>*/}
            {/*            <p>“{testi.description}”</p>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      ))}*/}
            {/*    </CustomSlider>*/}
            {/*  </Grid>*/}
            {/*  <Grid item xs={1} />*/}
            {/*</Grid>*/}
            <Grid container className={styles.registerContainer}>
              <Grid item xs={2} />
              <Grid
                item
                container
                xs={8}
                className={styles.register}
                style={{
                  marginBottom: "96px",
                  marginTop: "96px",
                }}
              >
                <Grid item xs={12} md={8}>
                  <h4 className="white">{t("home_footer_header")}</h4>
                </Grid>
                <Grid item xs={12} md={4} className={styles.buttonContainer}>
                  <a href="https://bit.ly/RegNarauction_tac2" target="_blank">
                    <Button outline round size="large" color="disabled">
                      <b className="large">{t("register").toUpperCase()}</b>
                    </Button>
                  </a>
                </Grid>
              </Grid>
              <Grid item xs={2} />
            </Grid>
          </main>
        </div>
      </div>
    </Layout>
  );
}
