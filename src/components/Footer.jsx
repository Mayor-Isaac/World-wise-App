import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear} WorldeWise Inc
      </p>
    </div>
  );
}
