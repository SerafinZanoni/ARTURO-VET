import styles from "./Login.module.css";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";

const Login = () => {
  const { loginUser } = useContext(UsersContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    initialErrors: {
      username: "Username is required",
      password: "Password is required",
    },
    validate: (values) => {
      let errors = {};
      if (!values.username.trim()) {
        errors.username = "Username is required";
      } else if (!/^[a-zA-Z0-9]+$/.test(values.username)) {
        errors.username = "Username must contain only letters and numbers";
      }
      if (!values.password.trim()) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      } else if (!/[A-Z]/.test(values.password)) {
        errors.password = "Password must contain at least one uppercase letter";
      } else if (!/[0-9]/.test(values.password)) {
        errors.password = "Password must contain at least one number";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        errors.password =
          "Password must contain at least one special character";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await loginUser(values);
        Swal.fire({
          icon: "success",
          title: "User logged successfully",
          timer: 1500,
        });
        navigate("/");
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User or password incorrect",
        });
      }
    },
  });

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <h2 className={styles.formTitle}>Welcome</h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Username:</label>
          <input
            className={styles.formInput}
            type="text"
            name="username"
            placeholder="Insert your username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.errors.username && formik.touched.username ? (
            <label className={styles.errorLabel}>
              {formik.errors.username}
            </label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password:</label>
          <input
            className={styles.formInput}
            type="password"
            name="password"
            placeholder="Insert your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <label className={styles.errorLabel}>
              {formik.errors.password}
            </label>
          ) : null}
        </div>

        <button
          className={styles.formButton}
          type="submit"
          disabled={
            Object.keys(formik.errors).length > 0 ||
            !formik.values.username ||
            !formik.values.password
          }
        >
          Register
        </button>
        <br />
        <label className={styles.formLabel}>
          Dont have an account?{" "}
          <Link className={styles.link} to="/register">
            Register
          </Link>
        </label>
      </form>
    </div>
  );
};

export default Login;
