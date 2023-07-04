import React from 'react';

import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import styles from 'styles/GuidelinesLinks.module.css';
import ActiveLink from './ActiveLink';
import useTranslation from 'utils/useTranslation';

const items = [
  // {
  //   href: "/guidelines/messages",
  //   labelEn: "Messages",
  //   labelId: "Pesan",
  // },
  {
    href: '/guidelines/term',
    labelEn: 'Term & Condition',
    labelId: 'Syarat & Ketentuan',
    segmented: true,
  },
  {
    href: '/guidelines/auction',
    labelEn: 'Auction Guidelines',
    labelId: 'Petunjuk Lelang',
    segmented: true,
  },
  // {
  //     href: "/guidelines/buyers",
  //     labelEn: "Guidelines For Buyers",
  //     labelId: "Peraturan Untuk Buyers",
  //     segmented: true,
  // },
];

export default function GuidelinesHeader() {
  const router = useRouter();
  const [t, currentLang] = useTranslation();
  const section = router.route.split('/')[2];

  return (
    <Grid container className={styles.header}>
      <Grid item xs={1} />
      <div className={styles.titles}>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <h3>{t(section)}</h3>
            <p>{t(`guidelines_${section}_subtitle`)}</p>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </div>
      <Grid item xs={10} className={styles.links}>
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            <ActiveLink
              activeClassName={styles.navActive}
              href={item.href}
              segmented={item.segmented}
            >
              <a
                className={styles.navLink}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`${item.href}?lang=${currentLang}`, undefined, {
                    scroll: false,
                  });
                }}
              >
                {currentLang === 'en' ? item.labelEn : item.labelId}
              </a>
            </ActiveLink>
            {index < items.length - 1 && <div className={styles.divider} />}
          </React.Fragment>
        ))}
        {/* <ActiveLink
          activeClassName={styles.navActive}
          href="/guidelines/messages"
        >
          <a className={styles.navLink}>Messages</a>
        </ActiveLink>
        <div className={styles.divider} />
        <ActiveLink
          activeClassName={styles.navActive}
          href="/guidelines/auctioneers"
          segmented
        >
          <a className={styles.navLink}>Guideline For Auctioneers</a>
        </ActiveLink>
        <div className={styles.divider} />
        <ActiveLink
          activeClassName={styles.navActive}
          href="/guidelines/bidders"
          segmented
        >
          <a className={styles.navLink}>Guideline For Bidders</a>
        </ActiveLink>

        <div className={styles.divider} />
        <ActiveLink
          activeClassName={styles.navActive}
          href="/guidelines/buyers"
          segmented
        >
          <a className={styles.navLink}>Guideline For Buyers</a>
        </ActiveLink> */}
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}
