import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { Appointment, Status } from "../interFaces/AppointmentInterface";
import { getUserByIdService } from "./userService";

const appointmentList: Appointment[] = [];
let id: number = 1;

export const getAppointmentService = async (): Promise<Appointment[]> => {
  return appointmentList;
};

export const getAppointmentByIdService = async (
  id: string
): Promise<Appointment> => {
  const appointmentFound = appointmentList.find(
    (appointment) => appointment.id === parseInt(id, 10)
  );
  if (!appointmentFound) {
    throw new Error("Appointment not found");
  }
  return appointmentFound;
};

export const registerAppointmentService = async (
  appointment: AppointmentRegisterDTO
): Promise<AppointmentRegisterDTO> => {
  const userFound = await getUserByIdService(appointment.userId.toString());
  if (!userFound) {
    throw new Error("User not found");
  }
  const newAppointment: Appointment = {
    id: id++,
    date: new Date(appointment.date),
    time: appointment.time,
    status: Status.active,
    userId: appointment.userId,
  };

  appointmentList.push(newAppointment);

  return newAppointment;
};

export const cancelAppointmentService = async (
  id: string
): Promise<AppointmentRegisterDTO> => {
  const appointmentFound = appointmentList.find(
    (appointment) => appointment.id === parseInt(id, 10)
  );
  if (!appointmentFound) {
    throw new Error("Appointment not found");
  }

  if (appointmentFound.status === Status.canceled) {
    throw new Error("Appointment already canceled");
  }

  appointmentFound.status = Status.canceled;
  return appointmentFound;
};
