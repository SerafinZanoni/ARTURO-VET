import { Router } from "express";

import userRouter from "./userRoutes";
import appointmentsRouter from "./appointmentsRoutes";

const router: Router = Router();

router.use("/users", userRouter);
router.use("/appointments", appointmentsRouter);

export default router;
