import { createContext } from "react";
import axios from "axios";
import { useState } from "react";

export const UsersContext = createContext({
  user: "",
  userAppointments: [],
  loginUser: async () => {},
  registerUser: async () => {},
  logOutUser: () => {},
  getUserAppointments: async () => {},
  cancelAppointment: async () => {},
  createAppointment: async () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("userId") || "");
  const [userAppointments, setUserAppointments] = useState([]);

  const loginUser = async (userData) => {
    const response = await axios.post(
      "http://localhost:3000/users/login",
      userData
    );

    localStorage.setItem("userId", response.data.data.user.id);
    setUser(response.data.data.user.id);
  };

  const registerUser = async (userData) => {
    const response = await axios.post(
      "http://localhost:3000/users/register",
      userData
    );
  };

  const logOutUser = () => {
    localStorage.clear();
    setUser("");
    setUserAppointments([]);
  };

  const getUserAppointments = async (userId) => {
    const response = await axios.get(`http://localhost:3000/users/${userId}`);
    setUserAppointments(response.data.data.appointments);
  };

  const cancelAppointment = async (appointmentId) => {
    await axios.put(
      `http://localhost:3000/appointments/cancel/${appointmentId}`
    );
    const userAppointmentsUpdate = userAppointments.map((appointment) => {
      if (appointment.id === appointmentId) {
        const appointmentUpdate = { ...appointment, status: "Canceled" };
        return appointmentUpdate;
      } else return appointment;
    });
    setUserAppointments(userAppointmentsUpdate);
  };
  const createAppointment = async (values) => {
    const appointmentsValues = {
      ...values,
      userId: user,
    };
    await axios.post(
      "http://localhost:3000/appointments/schedule",
      appointmentsValues
    );
  };

  const value = {
    user,
    userAppointments,
    loginUser,
    registerUser,
    logOutUser,
    getUserAppointments,
    cancelAppointment,
    createAppointment,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
