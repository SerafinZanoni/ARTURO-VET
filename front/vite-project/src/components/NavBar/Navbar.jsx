import Styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={Styles.navbar}>
      <div className={Styles.logoContainer}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/017/694/987/original/veterinary-medicine-logo-illustration-vector.jpg"
          alt="logo"
          className={Styles.logo}
        />
        <h1 className={Styles.title}>Dr Arturo</h1>
      </div>
      <ul className={Styles.navList}>
        <li className={Styles.navItem}>Home</li>
        <li className={Styles.navItem}>Appointments</li>
        <li className={Styles.navItem}>About</li>
      </ul>
    </nav>
  );
}
