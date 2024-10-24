import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Apointments.entity";

export const AppointmentRepository = AppDataSource.getRepository(
  Appointment
).extend({
  validateAllowAppointment: function (date: Date, time: string): void {
    const [hour, minute] = time.split(":").map(Number);

    const appointmentDate = new Date(date);

    appointmentDate.setHours(hour, minute, 0);
    const today = new Date();
    const difMiliSecnonds = today.getTime() - appointmentDate.getTime();
    const difHours = difMiliSecnonds / (1000 * 60 * 60);

    if (difHours > 24)
      throw new Error(
        "Appointment date cannot be more than 24 hours in advance"
      );

    const appointmentDateArg = new Date(
      appointmentDate.getTime() - 3 * 60 * 60 * 1000
    );
    const nowInArg = new Date(today.getTime() - 3 * 60 * 60 * 1000);

    if (appointmentDateArg < nowInArg)
      throw new Error("Appointment date cannot be in the past");

    const dayOnWeek = appointmentDateArg.getUTCDate();
    if (dayOnWeek === 5 || dayOnWeek === 6)
      throw new Error("Appointment date cannot be on weekend");

    if (hour < 8 || hour > 20)
      throw new Error("Appointment time must be between 8am and 8pm");
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
        `Appointment ${time}, ${date} already exists for user ${userId}`
      );
    }
  },
});
