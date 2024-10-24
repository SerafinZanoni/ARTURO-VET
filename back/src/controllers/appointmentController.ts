import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import {
  cancelAppointmentService,
  getAppointmentByIdService,
  getAppointmentService,
  registerAppointmentService,
} from "../services/appointmentService";

import { Appointment } from "../entities/Apointments.entity";
import { catchingErrors } from "../utils/catchingErrors";

const getAppointmentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const serviceResponse = await getAppointmentService();
  res.status(200).json({
    message: "Appointments loaded successfully",
    data: serviceResponse,
  });
};

const getAppointmentByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const serviceResponse = await getAppointmentByIdService(id);
  res.status(200).json({
    data: serviceResponse,
  });
};

const registerAppointmentController = async (
  req: Request<unknown, unknown, AppointmentRegisterDTO>,
  res: Response
): Promise<void> => {
  const serviceResponse: Appointment = await registerAppointmentService(
    req.body
  );
  res.status(201).json({
    message: "Appointment created successfully",
    data: serviceResponse,
  });
};

const cancelAppointmentController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const serviceResponse = await cancelAppointmentService(id);
  res.status(200).json({
    message: "Appointment canceled successfully",
    data: serviceResponse,
  });
};

const appointmentsControllers = {
  getAppointmentsController: catchingErrors(getAppointmentsController),
  getAppointmentByIdController: catchingErrors(getAppointmentByIdController),
  registerAppointmentController: catchingErrors(registerAppointmentController),
  cancelAppointmentController: catchingErrors(cancelAppointmentController),
};

export default appointmentsControllers;
