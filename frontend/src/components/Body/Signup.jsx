import styles from './signup.module.css'
export default function Signup(){
    return (
      <div className={styles.bg}>
        <div className={styles.signupContainer}>
          <h1>Signup</h1>
          <form action="" className={styles.signUpBox}>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button>Signup</button>
          </form>
          <p>
            Already have account?{" "}
            <span>Login In</span>
          </p>
        </div>
      </div>
    );
}