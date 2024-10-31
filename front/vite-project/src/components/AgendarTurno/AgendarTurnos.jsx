import Swal from "sweetalert2";
import Style from "./AgendarTurnos.module.css";
import { useFormik } from "formik";
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";
const AgendarTurnos = () => {
  const { createAppointment } = useContext(UsersContext);

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
    },
    validate: (values) => {
      let errors = {};
      const { date, time } = values;
      const selectDateTime = new Date(`${date}T${time}`);
      const now = new Date();
      const isValidTime = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes;
        const startTime = 8 * 60;
        const endTime = 20 * 60;
        return totalMinutes >= startTime && totalMinutes <= endTime;
      };

      const twentyFourHoursLater = new Date(
        now.getTime() + 24 * 60 * 60 * 1000
      );
      if (!date) {
        errors.date = "Date is required";
      } else if (selectDateTime < now) {
        errors.date =
          "Appointments must be scheduled at least 24 hours in advance";
      } else if (selectDateTime < twentyFourHoursLater) {
        errors.date =
          "Appointments must be scheduled at least 24 hours in advance";
      } else if (
        selectDateTime.getDay() === 0 ||
        selectDateTime.getDay() === 6
      ) {
        errors.date = "Appointments can only be scheduled on weekdays";
      }

      if (!time) {
        errors.time = "Time is required";
      } else if (!isValidTime(time)) {
        errors.time = "Please select a time between 8:00am and 8:00pm";
      }

      return errors;
    },
    initialErrors: {
      date: "Date is required",
      time: "Time is required",
    },
    onSubmit: async (values) => {
      try {
        await createAppointment(values);
        Swal.fire({
          icon: "success",
          title: "User created successfully",
          timer: 1500,
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
        });
      } finally {
        formik.resetForm();
      }
    },
  });

  return (
    <div className={Style.container}>
      <h1 className={Style.title}>Make an appointment</h1>
      <form className={Style.formContainer} onSubmit={formik.handleSubmit}>
        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Date</label>
          <input
            type="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            onChange={formik.handleChange}
            value={formik.values.date}
            className={
              formik.touched.date && formik.errors.date
                ? Style.inputError
                : Style.formInput
            }
          />
          {formik.errors.date ? (
            <>
              <div className={Style.inputError}>{formik.errors.date}</div>
            </>
          ) : null}
        </div>

        <div className={Style.formGroup}>
          <label htmlFor="time">Time</label>
          <input
            id="time"
            name="time"
            type="time"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.time}
            className={
              formik.touched.time && formik.errors.time
                ? Style.errorInput
                : Style.formInput
            }
          />
          {formik.errors.time ? (
            <div className={Style.error}>{formik.errors.time}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className={Style.formButton}
          disabled={Object.keys(formik.errors).length > 0}
        >
          Make an appointment
        </button>
      </form>
    </div>
  );
};

export default AgendarTurnos;
