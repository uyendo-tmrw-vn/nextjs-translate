import React, { Children } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "utils/useTranslation";

interface ActiveLinkProps {
  activeClassName: string;
  href: string;
  lang?: "en" | "id";
  as?: string;
  segmented?: boolean;
  children: React.ReactNode;
}

const ActiveLink = ({
  children,
  activeClassName,
  segmented,
  href,
  as,
  lang,
  ...props
}: ActiveLinkProps) => {
  const { pathname } = useRouter();
  const child = Children.only(children);
  const childClassName = (child as any).props.className || "";

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const currentPaths = pathname.split("/").filter((_, i) => i !== 0);
  const currentLength = currentPaths.length;
  const targetPaths = href.split("/").filter((_, i) => i !== 0);
  const targetLength = targetPaths.length;
  const samePath =
    currentLength > 0 && targetLength > 0 && currentLength > targetLength
      ? (targetPaths as any).reduce(
          (prev, next, index) => prev && next === currentPaths[index]
        )
      : false;

  const isActive =
    pathname === href || pathname === as || (segmented ? samePath : false);
  const className = isActive
    ? `${childClassName} ${activeClassName}`.trim()
    : childClassName;

  const [_, currentLang] = useTranslation();

  return (
    <Link href={`${href}?lang=${lang ?? currentLang}`} {...props}>
      {React.cloneElement(child as any, {
        className: className || null,
      })}
    </Link>
  );
};
export default ActiveLink;
