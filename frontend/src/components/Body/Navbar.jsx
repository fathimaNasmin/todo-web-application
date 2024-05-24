import styles from "./navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../Hooks/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const {isAuthenticated, token, setAuth} = useContext(AuthContext);
    const handleSignOut = () =>{
        console.log("signout:", token);
        setAuth(null, false)
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
