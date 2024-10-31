import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import Register from "./views/Register/Register";
import Style from "./App.module.css";
import Navbar from "./components/NavBar/Navbar";
import { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./views/NotFound/NotFound";
import { UsersContext } from "./context/UserContext";

import AgendarTurnos from "./components/AgendarTurno/AgendarTurnos";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNotFound, setIsNotFound] = useState(false);
  const { user } = useContext(UsersContext);

  useEffect(() => {
    const isValidRoutes = [
      "/",
      "/login",
      "/register",
      "/misturnos",
      "/agendarturno",
    ];
    if (isValidRoutes.includes(location.pathname)) setIsNotFound(true);
    else setIsNotFound(false);

    if (
      !user &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
    }

    if (
      user &&
      location.pathname === "/login" &&
      location.pathname === "/register"
    ) {
      navigate("/");
    }
  }, [location.pathname, user, navigate]);

  return (
    <>
      {!user ? (
        <main className={Style.main}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      ) : (
        <>
          {!isNotFound && <div className={Style.container}></div>}

          <main className={Style.main}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/misturnos" element={<MisTurnos />} />
              <Route path="/agendarturno" element={<AgendarTurnos />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </>
      )}
    </>
  );
}

export default App;
