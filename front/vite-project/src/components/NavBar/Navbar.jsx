import Styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";

export default function Navbar() {
  const { logOutUser } = useContext(UsersContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOutUser();
        navigate("/login");
      }
    });
  };

  return (
    <div className={Styles.navbarContainer}>
      <div className={Styles.logoContainer}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/017/694/987/original/veterinary-medicine-logo-illustration-vector.jpg"
          alt="logo"
          className={Styles.logo}
        />
        <h1 className={Styles.title}>Artur & Co. Veterinary Clinic</h1>
      </div>

      <nav className={Styles.navbar}>
        <li className={Styles.navItem}>
          <Link
            className={`${Styles.navLink} ${
              location.pathname === "/" ? Styles.active : ""
            }`}
            to={"/"}
          >
            Home
          </Link>
        </li>
        <li className={Styles.navItem}>
          <Link
            className={`${Styles.navLink} ${
              location.pathname === "/misturnos" ? Styles.active : ""
            }`}
            to={"/misturnos"}
          >
            Appointments
          </Link>
        </li>
        <li className={Styles.navItem}>
          <Link
            className={`${Styles.navLink} ${
              location.pathname === "/agendarturno" ? Styles.active : ""
            }`}
            to={"/agendarturno"}
          >
            New Appointment
          </Link>
        </li>
        <li className={Styles.navItem} onClick={handleLogout}>
          <p className={Styles.navLink}>Log out </p>
        </li>
      </nav>
    </div>
  );
}
