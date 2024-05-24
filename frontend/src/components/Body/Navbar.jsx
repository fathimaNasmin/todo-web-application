import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const handleSignOut = () =>{
        console.log("signout");
    }
  return (
    <div className={styles.navContainer}>
      <div className={styles.name}>Welcome, User</div>
      <div className={styles.signoutIcon}>
        <button onClick={handleSignOut}>
          <FontAwesomeIcon
            icon={faPowerOff}
            transform="grow-12"
            className={styles.icon}
          />
        </button>
      </div>
    </div>
  );
}
