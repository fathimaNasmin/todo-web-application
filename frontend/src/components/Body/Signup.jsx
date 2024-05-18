import { useState } from "react";
import styles from "./signup.module.css";
import { object, string, ref } from "yup";

export default function Signup() {
  const [signState, setSignState] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let validationSchema = object({
    name: string().required("Name required"),
    email: string().email("Invalid format").required("Email required"),
    password: string()
      .required("Password required")
      .min(8, "Password must be of 8 characters.")
      .matches(
        /[!@#$%^&*(),.?":{}|<>"]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain atleast uppercase letter")
      .matches(/[a-z]/, "Password must contain atleast one lowercase letter"),
    confirmPassword: string()
      .oneOf([ref("password")], "Password must match")
      .required("Confirm password required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      // send post request to api with name, password and email id.
      // redirect to home page
      console.log("form submitted", formData);
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.bg}>
      <div className={styles.signupContainer}>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className={styles.signUpBox}>
          <>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className={styles.error}>{errors.name}</div>}
          </>

          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className={styles.error}>{errors.password}</div>
          )}

          <>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className={styles.error}>{errors.confirmPassword}</div>
            )}
          </>

          <button>Signup</button>
        </form>

        <p>
          Already have account? <span>Login In</span>
        </p>
      </div>
    </div>
  );
}
