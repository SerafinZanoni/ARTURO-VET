import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Apointments.entity";

export const AppointmentRepository = AppDataSource.getRepository(
  Appointment
).extend({
  validateAllowAppointment: function (date: Date, time: string): void {
    const [hour, minute] = time.split(":").map(Number);

    // Validar formato de hora
    if (
      isNaN(hour) ||
      isNaN(minute) ||
      hour < 0 ||
      hour > 23 ||
      minute < 0 ||
      minute > 59
    ) {
      throw new Error(
        "Invalid time format. Please provide time in HH:MM format."
      );
    }

    // Crear el objeto de fecha de la cita con la hora proporcionada
    const appointmentDate = new Date(date);
    appointmentDate.setHours(hour, minute, 0);

    const today = new Date();

    // Verificar si la cita es en el pasado
    if (appointmentDate < today) {
      throw new Error("Appointment date cannot be in the past");
    }

    // Verificar si la cita cae en fin de semana
    const dayOfWeek = appointmentDate.getDay(); // Obtener día de la semana sin ajuste de UTC
    if (dayOfWeek === 1 || dayOfWeek === 6) {
      throw new Error("Appointment date cannot be on a weekend");
    }

    // Verificar si la hora está entre las 8 AM y las 8 PM
    if (hour < 8 || hour > 20) {
      throw new Error("Appointment time must be between 8am and 8pm");
    }
  },

  validateExistAppointment: async function (
    date: Date,
    time: string,
    userId: number
  ): Promise<void> {
    const appointmentFound = await this.findOne({
      where: { user: { id: userId }, date: date, time: time },
    });

    if (appointmentFound) {
      throw new Error(
        `Appointment at ${time} on ${date} already exists for user ${userId}`
      );
    }
  },
});
