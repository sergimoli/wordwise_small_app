import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* this is like {children} props --> Outlet */}
      <Outlet />
      {/* TODO: this footer should be as a new component. */}
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear} by WordWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
