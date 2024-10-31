import { useContext, useEffect } from "react";
import Turno from "../../components/Turno/Turno";
import Style from "./MisTurnos.module.css";
import { UsersContext } from "../../context/UserContext";

const MisTurnos = () => {
  const { getUserAppointments, user, userAppointments } =
    useContext(UsersContext);

  useEffect(() => {
    getUserAppointments(user);
  }, []);

  return (
    <div className={Style.container}>
      <div className={Style.containerH1}>
        <h1>My Appointments</h1>
      </div>
      <div className={Style.containerTurns}>
        {userAppointments.length > 0 ? (
          userAppointments.map((turno) => (
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
