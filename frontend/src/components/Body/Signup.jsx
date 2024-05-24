import { useEffect, useState, useContext } from "react";
import styles from "./signup.module.css";
import { object, string, ref } from "yup";
import axiosInstance from "../../api";
import { baseUrl, userLoginUrl, userRegisterUrl } from "../../urls";
import { Toaster, toast } from "sonner";
import { AuthContext } from "../Hooks/authContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [signState, setSignState] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { isAuthenticated, setAuth } = useContext(AuthContext);

  // Login Form Validation
  let loginValidationSchema = object({
    email: string().email("Invalid format").required("Email required"),
    password: string().required("Password required"),
  });

  // SignUp form validation
  let signUpValidationSchema = object({
    name: string()
      .required("Name required")
      .min(6, "Name must have 6 characters"),
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

    setErrors({ ...errors, [name]: undefined });
  };

  // Login/signup on submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signState) {
      try {
        await signUpValidationSchema.validate(formData, { abortEarly: false });
        // send post request to api with name, password and email id.
        const { confirmPassword, ...data } = formData;
        axiosInstance
          .post(userRegisterUrl, data)
          .then(function (response) {
            console.log(response);
            // show message
            if (response.status === 201) {
              toast.success(<div>Account Created successfully</div>, {
                duration: 5000,
                position: "top-center",
              });
            }
          })
          .catch(function (error) {
            console.log(error);
            if (error.response === 400) {
              toast.error(<div>User already exists.</div>, {
                duration: 5000,
                position: "top-center",
              });
            }

            setFormData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
          });
      } catch (error) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    } else {
      try {
        await loginValidationSchema.validate(formData, { abortEarly: false });
        // send post request to api with name, password and email id.
        const { name, confirmPassword, ...data } = formData;
        axiosInstance
          .post(userLoginUrl, formData)
          .then(function (response) {
            console.log(response);
            if (response.status === 200) {
              setAuth(response.data.token, true);
              navigate("/todopage", { replace: true });
            }
          })
          .catch(function (error) {
            console.log(error.response.data["non_field_errors"][0]);
            if (error.response.status === 400) {
              toast.error(<div>Invalid Email or Password</div>, {
                duration: 5000,
                position: "top-center",
              });
            } else if (error.response.status === 500) {
              toast.error(<div>Server Error.Try again later...</div>, {
                duration: 5000,
                position: "top-center",
              });
            }
            setFormData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
          });
        // redirect to login page
        console.log("form submitted", formData);
      } catch (error) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className={styles.bg}>
      <Toaster richColors />;
      <div className={styles.signupContainer}>
        <h1>{signState ? "Signup" : "Login"}</h1>
        <form onSubmit={handleSubmit} className={styles.signUpBox}>
          {signState ? (
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
          ) : (
            ""
          )}

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
          {signState ? (
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
          ) : (
            ""
          )}

          <button>{signState ? "Signup" : "Login"}</button>
        </form>
        {signState ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => {
                setSignState(false);
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
            >
              Login In
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => {
                setSignState(true);
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
