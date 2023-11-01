import { ReactElement } from 'react';
import styles from './Footer.module.scss';

const Footer = (): ReactElement => {
  const copyrightText = ' © 2023 All Rights Reserved | ';

  return (
    <footer className={styles.footer}>
      <div className="footer__container">
        <p className={styles.footer__copyright}>
          <a href="https://github.com/FreightDH" target="blank" rel="noreferrer">
            FreightDH
          </a>
          {copyrightText}
          <a href="https://rs.school/react/" target="blank" rel="noreferrer">
            RSSchool
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
