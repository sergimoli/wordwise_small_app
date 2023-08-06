import Map from "../components/Map";
import Sidebar from "../components/SideBar";
import User from "../components/User";
import styles from "./AppLayout.module.css";

//with csm snippet the css is automatically added!

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
