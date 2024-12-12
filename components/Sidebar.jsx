import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import styles from "./Sidebar.module.css";

import Logo from "./Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}
