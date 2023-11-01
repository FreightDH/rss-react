import { Component } from 'react';
import styles from './Footer.module.scss';

class Footer extends Component {
  copyrightText: string;

  constructor(props = {}) {
    super(props);
    this.copyrightText = ' © 2023 All Rights Reserved | ';
  }
  render() {
    return (
      <footer className={styles.footer}>
        <div className="footer__container">
          <p className={styles.footer__copyright}>
            <a href="https://github.com/FreightDH" target="blank" rel="noreferrer">
              FreightDH
            </a>
            {this.copyrightText}
            <a href="https://rs.school/react/" target="blank" rel="noreferrer">
              RSSchool
            </a>
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
