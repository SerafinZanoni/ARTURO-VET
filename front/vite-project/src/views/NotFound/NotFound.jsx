import Styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>404 </h1>
      <p className={Styles.text}>Page not found</p>
      <Link className={Styles.link} to="/">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
