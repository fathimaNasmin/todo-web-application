import { useState } from "react";
import styles from "./signup.module.css";

export default function Signup() {
  const [signState, setSignState] = useState(true);
  return (
    <div className={styles.bg}>
      <div className={styles.signupContainer}>
        <h1>{signState ? "Signup" : "Login"}</h1>
        <form action="" className={styles.signUpBox}>
          {signState ? <input type="text" placeholder="Name" /> : ""}

          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          {signState ? (
            <input type="password" placeholder="Confirm Password" />
          ) : (
            ""
          )}

          <button>{signState ? "Signup" : "Login"}</button>
        </form>
        {signState ? (
          <p>
            Already have account? <span onClick={()=>{setSignState(false)}}>Login In</span>
          </p>
        ) : (
          <p>
            Don't have Account? <span onClick={()=>setSignState(true)}>Sign Up</span>
          </p>
        )}
      </div>
    </div>
  );
}
