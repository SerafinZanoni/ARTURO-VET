import PropTypes from "prop-types";
import Styles from "./Turnos.module.css";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";
const Turno = ({ id, date, time, status }) => {
  const { cancelAppointment } = useContext(UsersContext);
  const handleCancel = async () => {
    try {
      await cancelAppointment(id);
      Swal.fire({
        icon: "success",
        title: "Appointment Cancelled successfully",
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }
  };
  return (
    <div className={Styles.appointmentCard}>
      <div className={Styles.appointmentHeader}>
        <h3>Appointment {id}</h3>
        <span
          className={
            status === "Active" ? Styles.statusActive : Styles.statusInactive
          }
        >
          {status}
        </span>
      </div>
      <div className={Styles.appointmentDetails}>
        <p>Date: </p> <span>{date}</span>
        <p>Time: </p> <span>{time}</span>
      </div>
      <button
        className={`${Styles.cancelButton} ${
          status === "Canceled" ? Styles.disabled : ""
        }`}
        onClick={handleCancel}
        disabled={status === "Canceled"}
      >
        Cancel
      </button>
    </div>
  );
};

Turno.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Turno;
