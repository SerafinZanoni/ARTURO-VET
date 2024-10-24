import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { Appointment } from "../entities/Apointments.entity";
import { Status } from "../interFaces/AppointmentInterface";
import { AppointmentRepository } from "../repositories/Appointment.Repository";
import { CustomError } from "../utils/customError";
import { getUserByIdService } from "./userService";

export const getAppointmentService = async (): Promise<Appointment[]> => {
  return await AppointmentRepository.find();
};

export const getAppointmentByIdService = async (
  id: string
): Promise<Appointment | null> => {
  const appointmentFound = await AppointmentRepository.findOne({
    where: { id: parseInt(id, 10) },
  });
  if (!appointmentFound) {
    throw new CustomError(404, `Appointment ${id} not found`);
  }

  return appointmentFound;
};

export const registerAppointmentService = async (
  appointment: AppointmentRegisterDTO
): Promise<Appointment> => {
  await getUserByIdService(appointment.userId.toString());

  await AppointmentRepository.validateAllowAppointment(
    new Date(appointment.date),
    appointment.time
  );

  await AppointmentRepository.validateExistAppointment(
    new Date(appointment.date),
    appointment.time,
    appointment.userId
  );

  const newAppointment = AppointmentRepository.create({
    date: new Date(appointment.date),
    time: appointment.time,
    user: {
      id: appointment.userId,
    },
  });

  return await AppointmentRepository.save(newAppointment);
};

export const cancelAppointmentService = async (id: string): Promise<void> => {
  const appointmentFound = await AppointmentRepository.findOne({
    where: { id: parseInt(id, 10) },
  });
  if (!appointmentFound) {
    throw new CustomError(404, `Appointment  ${id} not found`);
  }

  if (appointmentFound.status === Status.canceled) {
    throw new CustomError(404, "Appointment already canceled");
  }

  appointmentFound.status = Status.canceled;

  await AppointmentRepository.save(appointmentFound);
};
