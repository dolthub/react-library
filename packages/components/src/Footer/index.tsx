import cx from "classnames";
import React, { ReactNode } from "react";
import ExternalLink from "../ExternalLink";
import css from "./index.module.css";

type TopLink = {
  href: string;
  name: string;
};

type SocialLink = {
  href: string;
  icon: ReactNode;
  label: string;
};

type LogoProps = {
  logo: ReactNode;
  poweredBy?: string;
};

type Props = LogoProps & {
  topLinks?: TopLink[];
  socialLinks?: SocialLink[];
  companyName: string;
  className?: string;
  version?: string;
  bottomButton?: ReactNode;
};

export default function Footer(props: Props) {
  return (
    <footer
      className={cx(css.footer, props.className)}
      data-cy="site-footer"
      aria-label="site-footer"
    >
      <div className={css.container}>
        <div className={css.top}>
          <Logo {...props} />
          {props.topLinks && <TopLinks topLinks={props.topLinks} />}
        </div>
        {props.socialLinks && <SocialLinks socialLinks={props.socialLinks} />}
      </div>
      {props.version && (
        <div className={css.version} aria-label="version">
          {props.version}
        </div>
      )}
      <div className={css.copyright} aria-label="copyright">
        © {new Date().getFullYear()} {props.companyName}. All rights reserved.
      </div>
      {props.bottomButton && (
        <div className={css.bottomButton}>{props.bottomButton}</div>
      )}
    </footer>
  );
}

function Logo(props: LogoProps) {
  return (
    <div className={css.logoContainer}>
      <div className={css.logo}>
        <div
          className={cx(css.logoInner, {
            [css.altLogoInner]: !!props.poweredBy,
          })}
        >
          {props.logo}
          {props.poweredBy && (
            <div className={css.poweredBy}>Powered by {props.poweredBy}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function SocialLinks({ socialLinks }: { socialLinks: SocialLink[] }) {
  return (
    <div className={css.socialLinks} data-cy="footer-social-links">
      {socialLinks.map(l => (
        <ExternalLink
          key={l.label}
          href={l.href}
          className={css.socialLink}
          aria-label={l.label}
        >
          {l.icon}
        </ExternalLink>
      ))}
    </div>
  );
}

function TopLinks({ topLinks }: { topLinks: TopLink[] }) {
  return (
    <div className={css.outerLinks}>
      <div className={css.topLinks} data-cy="footer-links">
        <ul>
          {topLinks.map(l => (
            <TopLinkItem key={l.name} {...l} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function TopLinkItem({ href, name }: TopLink) {
  return (
    <li key={name}>
      <a
        href={href}
        data-cy={`footer-${name.toLowerCase().replaceAll(" ", "-")}`}
      >
        {name}
      </a>
    </li>
  );
}
