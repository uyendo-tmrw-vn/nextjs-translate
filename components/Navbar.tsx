import React, { useEffect, useState } from "react";

import Link from "next/link";
import Grid from "@mui/material/Grid";
import styles from "styles/Navbar.module.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "./Button";

import ActiveLink from "./ActiveLink";
import useTranslation from "utils/useTranslation";
import { LanguageSwitcher } from "next-export-i18n";
import moment from "moment";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

export default function Navbar() {
  const [t, currentLang] = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  }, []);

  const handleChangeLanguage = (language: "en" | "id") => {
    localStorage.setItem("lang", language);
    moment.locale(language);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box className={styles.drawer}>
      <List>
        <ListItem button onClick={handleDrawerToggle}>
          <Grid container>
            <Grid item xs={1} />
            <Grid
              item
              xs={10}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <ListItemIcon>
                <Close />
              </ListItemIcon>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </ListItem>
        <Divider />
        <ListItem button>
          <ActiveLink activeClassName={styles.navActive} href="/catalog">
            <a className={styles.navLink}>{t("catalog")}</a>
          </ActiveLink>
        </ListItem>
        <ListItem button>
          <ActiveLink
            activeClassName={styles.navActive}
            href="/guidelines"
            segmented
          >
            <a className={styles.navLink}>{t("guidelines")}</a>
          </ActiveLink>
        </ListItem>
        <ListItem button>
          <ActiveLink activeClassName={styles.navActive} href="/about">
            <a className={styles.navLink}>{t("about")}</a>
          </ActiveLink>
        </ListItem>
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NavDropdown
            title={currentLang.toUpperCase()}
            id="collasible-nav-dropdown"
            className={styles.languageSelector}
          >
            <div onClick={() => handleChangeLanguage("en")}>
              <LanguageSwitcher lang="en">
                <NavDropdown.Item>
                  <a className={styles.navLink}>EN</a>
                </NavDropdown.Item>
              </LanguageSwitcher>
            </div>
            <div onClick={() => handleChangeLanguage("id")}>
              <LanguageSwitcher lang="id">
                <NavDropdown.Item>
                  <a className={styles.navLink}>ID</a>
                </NavDropdown.Item>
              </LanguageSwitcher>
            </div>
          </NavDropdown>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  if (!container) return null;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrollY === 0 ? "transparent" : "white",
          zIndex: 1,
          boxShadow:
            scrollY === 0
              ? "none"
              : "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)",
        }}
      >
        <Toolbar
          className={styles.listContainer}
          sx={{
            height: {
              xl: "54px",
              md: "96px",
            },
          }}
        >
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10} className={styles.navItems}>
              <Link href={`/?lang=${currentLang}`} passHref>
                <a>
                  <img src="/logo_brand.svg" alt="Home" />
                </a>
              </Link>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" }, color: "black" }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                component="ul"
                className={styles.list}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <li>
                  <ActiveLink activeClassName={styles.navActive} href="/">
                    <a className={styles.navLink}>{t("home")}</a>
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink
                    activeClassName={styles.navActive}
                    href="/catalog"
                  >
                    <a className={styles.navLink}>{t("catalog")}</a>
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink
                    activeClassName={styles.navActive}
                    href="/guidelines"
                    segmented
                  >
                    <a className={styles.navLink}>{t("guidelines")}</a>
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink activeClassName={styles.navActive} href="/about">
                    <a className={styles.navLink}>{t("about")}</a>
                  </ActiveLink>
                </li>
                <li style={{ width: "86px" }}>
                  <NavDropdown
                    title={currentLang.toUpperCase()}
                    id="collasible-nav-dropdown"
                    className={styles.languageSelector}
                  >
                    <div onClick={() => handleChangeLanguage("en")}>
                      <LanguageSwitcher lang="en">
                        <NavDropdown.Item>
                          <a className={styles.navLink}>EN</a>
                        </NavDropdown.Item>
                      </LanguageSwitcher>
                    </div>
                    <div onClick={() => handleChangeLanguage("id")}>
                      <LanguageSwitcher lang="id">
                        <NavDropdown.Item>
                          <a className={styles.navLink}>ID</a>
                        </NavDropdown.Item>
                      </LanguageSwitcher>
                    </div>
                  </NavDropdown>
                </li>
                <li className={styles.buttonContainer}>
                  <a href="https://bit.ly/RegNarauction_tac2" target="_blank">
                    <Button
                      size="nav"
                      color="primary"
                      className={styles.buttonLink}
                    >
                      {t("register")}
                    </Button>
                  </a>
                </li>
              </Box>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="top"
          variant="temporary"
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

// <nav>
// <Grid container>
//   <Grid item xs={1} />
//   <Grid item xs={10} className={styles.listContainer}>
//     <Link href={`/?lang=${currentLang}`} passHref>
//       <a>
//         <img src="/logo_brand.svg" alt="Home" />
//       </a>
//     </Link>
//     <ul className={styles.list}>
//       <li>
//         <ActiveLink activeClassName={styles.navActive} href="/">
//           <a className={styles.navLink}>{t("home")}</a>
//         </ActiveLink>
//       </li>
//       <li>
//         <ActiveLink activeClassName={styles.navActive} href="/catalog">
//           <a className={styles.navLink}>{t("catalog")}</a>
//         </ActiveLink>
//       </li>
//       <li>
//         <ActiveLink
//           activeClassName={styles.navActive}
//           href="/guidelines"
//           segmented
//         >
//           <a className={styles.navLink}>{t("guidelines")}</a>
//         </ActiveLink>
//       </li>
//       <li>
//         <ActiveLink activeClassName={styles.navActive} href="/about">
//           <a className={styles.navLink}>{t("about")}</a>
//         </ActiveLink>
//       </li>
//       <li>
//         <NavDropdown
//           title={currentLang.toUpperCase()}
//           id="collasible-nav-dropdown"
//           className={styles.languageSelector}
//         >
//           <div onClick={() => handleChangeLanguage("en")}>
//             <LanguageSwitcher lang="en">
//               <NavDropdown.Item>
//                 <a className={styles.navLink}>EN</a>
//               </NavDropdown.Item>
//             </LanguageSwitcher>
//           </div>
//           <div onClick={() => handleChangeLanguage("id")}>
//             <LanguageSwitcher lang="id">
//               <NavDropdown.Item>
//                 <a className={styles.navLink}>ID</a>
//               </NavDropdown.Item>
//             </LanguageSwitcher>
//           </div>
//           {/* <NavDropdown.Item>
//             <ActiveLink
//               activeClassName={styles.navActive}
//               href={route}
//               lang="id"
//             >
//               <a className={styles.navLink}>ID</a>
//             </ActiveLink>
//           </NavDropdown.Item> */}
//         </NavDropdown>
//       </li>
//       <li className={styles.buttonContainer}>
//         <a href="https://bit.ly/RegNarauction_tac2" target="_blank">
//           <Button
//             size="nav"
//             color="primary"
//             className={styles.buttonLink}
//           >
//             {t("register")}
//           </Button>
//         </a>
//       </li>
//     </ul>
//   </Grid>
//   <Grid item xs={1} />
// </Grid>
// </nav>
