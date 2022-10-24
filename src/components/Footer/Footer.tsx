import styles from './Footer.module.scss';
// import FooterText from '../../assets/icons/FooterConstellation.svg';

export const Footer = () => {
  return (
    <>
      <footer className={`${styles.fullWidth2} background`}>
        <div className={`${styles.footer}`}>
          <div className={`${styles.footerLeft} text`}>
            <div className={styles.footerText}>© 2022 ---</div>
            <div className={styles.footerText}>WERX EXPLORER V1.0</div>
          </div>
          {/* <img className={styles.poweredBy} src={FooterText} /> */}
        </div>
      </footer>
      <div></div>
    </>
  );
};
