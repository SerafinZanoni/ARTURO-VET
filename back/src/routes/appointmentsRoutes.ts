import { NextFunction, Request, Response, Router } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import appointmentsControllers from "../controllers/appointmentController";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", (req: Request, res: Response, next: NextFunction) =>
  appointmentsControllers.getAppointmentsController(req, res, next)
);

appointmentsRouter.get(
  "/:id",
  (req: Request<{ id: string }>, res: Response, next: NextFunction) =>
    appointmentsControllers.getAppointmentByIdController(req, res, next)
);

appointmentsRouter.post(
  "/schedule",
  (
    req: Request<unknown, unknown, AppointmentRegisterDTO>,
    res: Response,
    next: NextFunction
  ) => appointmentsControllers.registerAppointmentController(req, res, next)
);

appointmentsRouter.put(
  "/cancel/:id",
  (req: Request<{ id: string }>, res: Response, next: NextFunction) =>
    appointmentsControllers.cancelAppointmentController(req, res, next)
);

export default appointmentsRouter;
