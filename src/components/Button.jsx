//csm!
import styles from "./Button.module.css";
function Button({ children, onClick, type }) {
  return (
    // we dinamically selected the sytle that we want using this type prop string
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
