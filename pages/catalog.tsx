import React, { useEffect, useMemo, useRef, useState } from "react";

import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import LotCard from "components/LotCard";
import TextInput from "components/TextInput";
import Button from "components/Button";
import Paginator from "components/Paginator";
import CustomSlider from "components/CustomSlider";

import styles from "styles/Catalog.module.css";
import LotDetailModal from "components/LotDetailModal";
import { useRouter } from "next/router";
// import Modal from "react-modal";
import Link from "next/link";
import Layout from "components/Layout";

import axios from "axios";
import { Barang, BarangEvent, Event } from "utils/types";
import moment from "moment";
import useTranslation from "utils/useTranslation";

// Modal.setAppElement("#__next");

export default function Catalog() {
  const { lotId } = useRouter().query;
  const [barangEvents, setBarangEvents] = useState<BarangEvent>({});
  const [activeEventId, setActiveEventId] = useState<string | undefined>();
  const [fetchingBarang, setFetchingBarang] = useState(true);
  const [search, setSearch] = useState("");
  const [t] = useTranslation();
  const sliderRef = useRef<any>(null);
  const [previousLotId, nextLotId] = useMemo(() => {
    if (!lotId) return [undefined, undefined];

    const currentEvent = Object.entries(barangEvents)
      .map((e) => e[1])
      .find((value) => {
        return value.barang.find((b) => b.id === lotId) ? true : false;
      });
    if (!currentEvent) return [undefined, undefined];

    const { barang } = currentEvent;
    const { length } = barang;

    if (length === 1) return [undefined, undefined];

    const lotIndex = barang.findIndex((b) => b.id === lotId);

    const prevIndex = (lotIndex + length - 1) % length;
    const nextIndex = (lotIndex + 1) % length;

    return [barang[prevIndex].id, barang[nextIndex].id];
  }, [lotId, barangEvents]);

  const lotsToShow = useMemo(() => {
    if (!activeEventId) return [];

    return barangEvents[activeEventId].barang.filter((b) =>
      search.length > 0
        ? b.namaBarang.toLowerCase().search(search.toLowerCase()) !== -1 ||
          b.lot.toLowerCase().search(search.toLowerCase()) !== -1
        : true
    );
  }, [search, barangEvents, activeEventId]);

  const isOngoing = useMemo(() => {
    if (!activeEventId) return false;

    return !moment(moment()).isAfter(barangEvents[activeEventId].event.date);
  }, [barangEvents, activeEventId]);

  useEffect(() => {
    const fetch = async () => {
      const { data: events } = await axios.get<Event[]>(
        "https://narauction.et.r.appspot.com/event"
      );

      console.log(events);

      setBarangEvents(() => ({
        ...Object.fromEntries(
          events.map((e: Event) => [
            e.id,
            {
              event: e,
              barang: [],
            },
          ])
        ),
      }));

      console.log(events[0].id);
      // sliderRef.current.slickGoTo(events.length - 1);

      if (events.length > 0) setActiveEventId(events[0].id);
    };
    fetch();
  }, []);

  useEffect(() => {
    console.log(activeEventId);

    const fetch = async () => {
      setFetchingBarang(true);
      try {
        const { data: barang } = await axios.get<Barang[]>(
          `https://narauction.et.r.appspot.com/barang/event/${activeEventId}`
        );

        setBarangEvents((state) => ({
          ...state,
          [activeEventId!]: {
            ...state[activeEventId!],
            barang: [...barang],
          },
        }));
      } catch (e) {
        console.log(e);

        setBarangEvents((state) => ({
          ...state,
          [activeEventId!]: {
            ...state[activeEventId!],
            barang: [],
          },
        }));
      }
      setFetchingBarang(false);
    };

    if (activeEventId) fetch();
  }, [activeEventId]);

  const handleSlideChange = (index: number) => {
    setActiveEventId(Object.entries(barangEvents)[index][0]);
  };

  const handleSearch = (input: string) => {
    setSearch(input);
  };

  return (
    <Layout>
      <LotDetailModal
        lotId={lotId as string | undefined}
        nextLotId={nextLotId}
        previousLotId={previousLotId}
      />
      <div>
        <Grid container className={styles.root}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <header>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                  className={styles.videoResponsive}
                >
                  <iframe
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                    src="https://www.youtube.com/embed/bo9tjBGbXxQ"
                  ></iframe>
                </Box>
                <Box>
                  <h3>{t("catalog_header_title")}</h3>
                  <p className="medium">{t("catalog_header_caption")}</p>
                  <Link href="/catalog#events" passHref>
                    <Button>
                      <b>{t("look_all_events")}</b>
                    </Button>
                  </Link>
                </Box>
              </Box>
            </header>
            <div id="events">
              <CustomSlider
                className={styles.slider}
                autoplay={false}
                afterChange={handleSlideChange}
                slidesToShow={Math.min(
                  Math.max(Object.entries(barangEvents).length, 1),
                  3
                )}
                initialSlide={0}
                ref={sliderRef}
              >
                {Object.entries(barangEvents)
                  .reverse()
                  .map(([id, e], index) => (
                    <div
                      key={id}
                      onClick={() => sliderRef.current.slickGoTo(index)}
                    >
                      <div
                        className={styles.sliderItem}
                        style={{
                          background: `
                  linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.72) 100%),
                  url(${e.event.foto[0]})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        {!moment(moment()).isAfter(e.event.date) ? (
                          <div className={`${styles.tag} ${styles.open}`}>
                            <img src="/open.svg" alt="" />
                            <b>Open</b>
                          </div>
                        ) : (
                          <div className={`${styles.tag} ${styles.closed}`}>
                            <img src="/closed.svg" alt="" />
                            <b>Closed</b>
                          </div>
                        )}
                        <div className={styles.sliderContent}>
                          <h5>{e.event.name}</h5>
                          <div className={styles.subcontainer}>
                            <img
                              src="/broadcast.svg"
                              alt=""
                              className={`${styles.icon} icon`}
                            />
                            <p className="extra-small">
                              LIVE auction{" "}
                              {moment(e.event.date).format("dddd, D MMMM y")}
                            </p>
                          </div>
                          {!moment(moment()).isAfter(e.event.date) ? (
                            <a
                              href="https://bit.ly/RegNarauction_tac2"
                              target="_blank"
                            >
                              <Button size="small" color="secondaryPale">
                                <img
                                  src="/bid.svg"
                                  alt=""
                                  className={`${styles.icon} icon`}
                                />
                                <p className="small">{t("bidnow")}</p>
                              </Button>
                            </a>
                          ) : (
                            <Button
                              size="small"
                              color="secondaryPaleDisabled"
                              disabled
                            >
                              <img
                                src="/bid.svg"
                                alt=""
                                className={`${styles.icon} icon`}
                              />
                              <p className="small">{t("bidnow")}</p>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </CustomSlider>
            </div>
            <div id="lots">
              {activeEventId && barangEvents[activeEventId].barang.length > 0 && (
                <div className={styles.searchBar}>
                  <TextInput
                    type="text"
                    placeholder={t("search_lots")}
                    onChange={handleSearch}
                  />
                  {/* <Button color="secondary">
                  <b>{t("search")}</b>
                </Button> */}
                </div>
              )}
              {activeEventId && (
                <Grid container spacing={3}>
                  {lotsToShow.length > 0 && !fetchingBarang ? (
                    lotsToShow.map((b) => (
                      <Grid item xs={12} sm={6} md={4} key={b.id}>
                        {b.isAvailable ? (
                          <Link
                            passHref
                            href={`/catalog?lotId=${b.id}`}
                            scroll={false}
                          >
                            <a style={{ border: "none" }}>
                              <LotCard barang={b} isOngoing={isOngoing} />
                            </a>
                          </Link>
                        ) : (
                          <LotCard barang={b} isOngoing={isOngoing} />
                        )}
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <p className={styles.barangStatusText}>
                        {search.length > 0
                          ? `${t("noresult")}\n'${search}'`
                          : fetchingBarang
                          ? t("pleasewait")
                          : t("nolots")}
                      </p>
                    </Grid>
                  )}
                </Grid>
              )}
              <div className={styles.spacer} />
            </div>
            {/* <Paginator /> */}
          </Grid>
          <Grid item xs={1} />
          <div className={styles.background} />
        </Grid>
      </div>
    </Layout>
  );
}
