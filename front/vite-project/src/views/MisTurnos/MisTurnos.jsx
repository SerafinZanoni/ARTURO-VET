import { useEffect, useState } from "react";
import Turno from "../../components/Turno/Turno";
import Style from "./MisTurnos.module.css";
import axios from "axios";

const MisTurnos = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/appointments")
      .then((response) => {
        setTurnos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={Style.container}>
      <div className={Style.containerH1}>
        <h1>Mis turnos</h1>
      </div>
      <div className={Style.containerTurns}>
        {turnos.length > 0 ? (
          turnos.map((turno) => (
            <Turno
              key={turno.id}
              id={turno.id}
              date={turno.date}
              time={turno.time}
              status={turno.status}
            />
          ))
        ) : (
          <p>No hay turnos</p>
        )}
      </div>
    </div>
  );
};

export default MisTurnos;
