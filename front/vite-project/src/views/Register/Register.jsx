import styles from "./Register.module.css";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";

const Resgister = () => {
  const { registerUser } = useContext(UsersContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      nDni: "",
      username: "",
      password: "",
    },
    initialErrors: {
      name: "Name is required",
      email: "Email is required",
      birthdate: "Birthdate is required",
      nDni: "DNI number is required",
      username: "Username is required",
      password: "Password is required",
    },
    validate: (values) => {
      let errors = {};
      if (!values.name.trim()) {
        errors.name = "Name is required";
      } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(values.name)) {
        errors.name = "Invalid characters in name";
      }
      if (!values.email.trim()) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.birthdate) {
        errors.birthdate = "Birthdate is required";
      }

      if (!values.nDni.trim()) {
        errors.nDni = "DNI number is required";
      } else if (!/^\d+$/.test(values.nDni)) {
        errors.nDni = "DNI must be a number";
      }

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
        await registerUser(values);
        Swal.fire({
          icon: "success",

          title: "User registered successfully",

          timer: 1500,
        });
        navigate("/login");
      } catch (error) {
        if (error.response.data.details.includes("User")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Username already in use",
          });
        } else if (error.response.data.details.includes("Email")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email already in use",
          });
        } else if (error.response.data.details.includes("nDni")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "DNI already in use",
          });
        }
      }
    },
  });

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <h2 className={styles.formTitle}>Register form</h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Name:</label>
          <input
            className={styles.formInput}
            type="text"
            name="name"
            placeholder="Insert your name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <label className={styles.errorLabel}>{formik.errors.name}</label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email:</label>
          <input
            className={styles.formInput}
            type="text"
            name="email"
            placeholder="Insert your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <label className={styles.errorLabel}>{formik.errors.email}</label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Date of birth:</label>
          <input
            className={styles.formInput}
            type="date"
            name="birthdate"
            placeholder="Insert your birthdate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthdate}
          />
          {formik.errors.birthdate && formik.touched.birthdate ? (
            <label className={styles.errorLabel}>
              {formik.errors.birthdate}
            </label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>D.N.I.</label>
          <input
            className={styles.formInput}
            type="text"
            name="nDni"
            placeholder="Insert your DNI"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nDni}
          />
          {formik.errors.nDni && formik.touched.nDni ? (
            <label className={styles.errorLabel}>{formik.errors.nDni}</label>
          ) : null}
        </div>

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
            !formik.values.name ||
            !formik.values.email ||
            !formik.values.birthdate ||
            !formik.values.nDni ||
            !formik.values.username ||
            !formik.values.password
          }
        >
          Register
        </button>
        <br />
        <label className={styles.formLabel}>
          Already have an account?{" "}
          <Link className={styles.link} to="/login">
            Login
          </Link>
        </label>
      </form>
    </div>
  );
};

export default Resgister;
