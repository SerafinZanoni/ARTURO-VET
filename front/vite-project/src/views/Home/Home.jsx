import Style from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={Style.container}>
      <h1 className={Style.title}>Welcome</h1>
      <Link className={Style.link} to="/agendarturno">
        {" "}
        Make an appointment now!
      </Link>
    </div>
  );
}

export default Home;
