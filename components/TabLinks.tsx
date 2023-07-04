import React from "react";

import { useRouter } from "next/router";
import styles from "styles/TabLinks.module.css";
import ActiveLink from "./ActiveLink";
import useTranslation from "utils/useTranslation";

export interface TabLinkItem {
  label: string;
  href: string;
}

interface TabLinksProps {
  items: TabLinkItem[];
  className?: string;
}

function TabLinks({ items, className }: TabLinksProps) {
  const router = useRouter();
  const [_, currentLang] = useTranslation();

  return (
    <div className={`${className} ${styles.root}`}>
      {items.map((item) => (
        <ActiveLink
          key={item.href}
          activeClassName={styles.navActive}
          href={item.href}
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
            {item.label}
          </a>
        </ActiveLink>
      ))}
    </div>
  );
}

export default TabLinks;
