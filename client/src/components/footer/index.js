import React from "react";
import styles from "./index.module.css";
import { YouTube, Twitter, Facebook } from "../Icons/icons";
const Footer = () => {
  return (
    <div className={styles.Footer}>
      <p className={styles.FooterRights}>©2022 All Rights Reserved</p>
      <div className={styles.FooterLink}>
        <a href="https://www.youtube.com/" className={styles.IconContainer}>
          <YouTube />
        </a>
        <a href="https://www.twitter.com/" className={styles.IconContainer}>
          <Twitter />
        </a>
        <a href="https://www.facebook.com/" className={styles.IconContainer}>
          <Facebook />
        </a>
      </div>
      <div className={styles.FooterInfo}>
        <p>Contact Us</p>
        <p>Privacy Policies</p>
        <p>Help</p>
      </div>
    </div>
  );
};

export default Footer;
