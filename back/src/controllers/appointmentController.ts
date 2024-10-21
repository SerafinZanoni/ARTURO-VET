import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import {
  cancelAppointmentService,
  getAppointmentByIdService,
  getAppointmentService,
  registerAppointmentService,
} from "../services/appointmentService";
export const getAppointmentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse = await getAppointmentService();
    res.status(200).json({
      message: "Appointments loaded successfully",
      data: serviceResponse,
    });
  } catch (error) {
    res.status(500).json({ message: "Appointments not loaded", error: error });
  }
};

export const getAppointmentByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const serviceResponse = await getAppointmentByIdService(id);
    res.status(200).json({
      message: "Appointment loaded successfully",
      data: serviceResponse,
    });
  } catch (error) {
    res.status(500).json({ message: "Appointment not loaded", error: error });
  }
};

export const registerAppointmentController = async (
  req: Request<unknown, unknown, AppointmentRegisterDTO>,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse: AppointmentRegisterDTO =
      await registerAppointmentService(req.body);
    res.status(200).json({
      message: "Appointment created successfully",
      data: serviceResponse,
    });
  } catch (error) {
    res.status(500).json({ message: "Appointment not created", error: error });
  }
};

export const cancelAppointmentController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const serviceResponse = await cancelAppointmentService(id);
    res.status(200).json({
      message: "Appointment canceled successfully",
      data: serviceResponse,
    });
  } catch (error) {
    res.status(500).json({ message: "Appointment not canceled", error: error });
  }
};
