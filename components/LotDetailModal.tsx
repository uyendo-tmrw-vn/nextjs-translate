import React, { useEffect, useMemo, useState } from "react";

import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import styles from "styles/LotDetailModal.module.css";
import { useRouter } from "next/router";
import Button from "./Button";
import IconButton from "./IconButton";
import { Barang, Event } from "utils/types";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import useTranslation from "utils/useTranslation";

interface LotDetailModalProps {
  previousLotId?: string;
  nextLotId?: string;
  lotId?: string;
}

function LotDetailModal({
  lotId,
  previousLotId,
  nextLotId,
}: LotDetailModalProps) {
  const router = useRouter();
  const [isFetching, setFetching] = useState(true);
  const [barang, setBarang] = useState<Barang | undefined>();
  const [event, setEvent] = useState<Event | undefined>();
  const [fotoIndex, setFotoIndex] = useState<number>(0);

  const [t, currentLang] = useTranslation();
  const isOngoing = useMemo(() => {
    if (!event) return false;

    return !moment(moment()).isAfter(event.date);
  }, [event]);

  useEffect(() => {
    if (!lotId) return;

    const fetch = async () => {
      setFetching(true);
      const { data: newBarang } = await axios.get<Barang>(
        `https://narauction.et.r.appspot.com/barang/${lotId}`
      );
      const { data: newEvent } = await axios.get<Event>(
        `https://narauction.et.r.appspot.com/event/${newBarang.eventID}`
      );
      setBarang(newBarang);
      setEvent(newEvent);
      setFotoIndex(0);
      setFetching(false);
    };

    fetch();
  }, [lotId]);

  const handleClose = () =>
    router.push("/catalog", undefined, { scroll: false });

  return (
    <Modal
      open={!!lotId}
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <div className={styles.root}>
        {isFetching || !barang || !event ? (
          <div className={styles.pleaseWait}>
            <p>{t("pleasewait")}</p>
          </div>
        ) : (
          <>
            <div className={styles.closeButton}>
              <IconButton
                src="/close_small.svg"
                backgroundColor="transparent"
                onClick={handleClose}
              />
            </div>
            <Grid container className={styles.main}>
              <Grid
                item
                container
                xs={12}
                md={6}
                lg={4}
                className={styles.imagesPreview}
              >
                <div>
                  <a href={barang.foto[fotoIndex]} target="_blank">
                    <img
                      className={styles.currentImage}
                      src={barang.urlThumbnail[fotoIndex]}
                      alt=""
                    />
                  </a>
                  <ImageList
                    // sx={{ width: 500, height: 450 }}
                    cols={3}
                    rowHeight={128}
                    // rowHeight={164}
                    variant="quilted"
                    sx={{ overflow: "hidden" }}
                  >
                    {barang.urlThumbnail.map((item, index) => (
                      <ImageListItem key={item}>
                        <img
                          src={`${item}?w=164&h=164&fit=crop&auto=format`}
                          srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          loading="lazy"
                          className={styles.otherImage}
                          onClick={() => setFotoIndex(index)}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <div className={styles.tagBar}>
                  <div className={`${styles.tag} ${styles.lotTag}`}>
                    #{barang.lot}
                  </div>
                  {!!barang.isAvailable ? (
                    <div className={`${styles.tag} ${styles.availableTag}`}>
                      <img src="/available.svg" alt="" />
                      Available
                    </div>
                  ) : (
                    <div className={`${styles.tag} ${styles.unavailableTag}`}>
                      <img src="/unavailable.svg" alt="" />
                      Unavailable
                    </div>
                  )}
                </div>
                <h4 className="no-margin">{barang.namaBarang}</h4>
                <p>
                  Circa : <b>{barang.tahunPembuatan}</b>
                </p>
                <p>{currentLang == "en" ? barang.descEn : barang.descId}</p>
                <Grid
                  container
                  spacing={3}
                  sx={{
                    my: "16px",
                    py: "16px",
                    borderBottom: "1px solid #dde0e4",
                    borderTop: "1px solid #dde0e4",
                  }}
                >
                  <Grid item xs={6} lg={3}>
                    <b>{t("type")}</b>
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    {barang.tipe}
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    <b>{t("creator")}</b>
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    {barang.asalDaerah}
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    <b>{t("size")}</b>
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    {barang.size[0]}cm x {barang.size[1]}cm
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    <b>{t("dyetype")}</b>
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    {barang.dyeType}
                  </Grid>
                </Grid>
                <div className={styles.eventDetail}>
                  <img
                    src={event.foto[0]}
                    alt=""
                    className={styles.eventImage}
                  />
                  <div>
                    <b>{event.name}</b>
                    <div className={styles.subcontainer}>
                      <img
                        src="/broadcast.svg"
                        alt=""
                        className={styles.icon}
                      />
                      <p className="small">
                        LIVE auction{" "}
                        {moment(event.date).format("dddd, D MMMM y")}
                      </p>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
            <div className={styles.footer}>
              {previousLotId && (
                <Link
                  passHref
                  href={`/catalog?lotId=${previousLotId}`}
                  as={`/catalog/${previousLotId}`}
                  scroll={false}
                >
                  <a style={{ border: "none" }}>
                    <Button
                      color="disabled"
                      disabled={!previousLotId}
                      className={styles.button}
                    >
                      <b>
                        {" "}
                        {"< <"} {t("previouslot")}
                      </b>
                    </Button>
                  </a>
                </Link>
              )}
              <div className={styles.priceBar}>
                <div
                  className={`${styles.openBid} ${
                    !isOngoing ? styles.strikethrough : ""
                  }`}
                >
                  <p>{t("pricerange")} : </p>
                  <b>Rp. {barang.priceRange[0].toLocaleString()}</b>
                </div>
                <div
                  className={`${styles.normalPrice} ${
                    isOngoing ? styles.strikethrough : ""
                  }`}
                >
                  <p>{t("normalprice")} : </p>
                  <b>Rp. {barang.hargaAwal.toLocaleString()}</b>
                </div>
              </div>
              {nextLotId && (
                <Link
                  passHref
                  href={`/catalog?lotId=${nextLotId}`}
                  as={`/catalog/${nextLotId}`}
                  scroll={false}
                >
                  <a style={{ border: "none" }}>
                    <Button
                      color="disabled"
                      disabled={!nextLotId}
                      className={styles.button}
                    >
                      <b>
                        {" "}
                        {t("nextlot")} {"> >"}
                      </b>
                    </Button>
                  </a>
                </Link>
              )}
            </div>
            <div className={styles.priceBarSmall}>
              <div
                className={`${styles.openBid} ${
                  !isOngoing ? styles.strikethrough : ""
                }`}
              >
                <p>{t("pricerange")} : </p>
                <b>Rp. {barang.priceRange[0].toLocaleString()}</b>
              </div>
              <div
                className={`${styles.normalPrice} ${
                  isOngoing ? styles.strikethrough : ""
                }`}
              >
                <p>{t("normalprice")} : </p>
                <b>Rp. {barang.hargaAwal.toLocaleString()}</b>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
export default LotDetailModal;
