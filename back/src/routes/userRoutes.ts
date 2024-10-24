import { NextFunction, Request, Response, Router } from "express";
import userController from "../controllers/userController";

import { UserRegisterDTO, UserCredentialDTO } from "../dtos/UserDTO";

const userRouter: Router = Router();

userRouter.get("/", (req: Request, res: Response, next: NextFunction) =>
  userController.getUsersController(req, res, next)
);

userRouter.get(
  "/:id",
  (req: Request<{ id: string }>, res: Response, next: NextFunction) =>
    userController.getUserByIdController(req, res, next)
);

userRouter.post(
  "/register",
  (
    req: Request<unknown, unknown, UserRegisterDTO>,
    res: Response,
    next: NextFunction
  ) => userController.registrerUserController(req, res, next)
);

userRouter.post(
  "/login",
  (
    req: Request<unknown, unknown, UserCredentialDTO>,
    res: Response,
    next: NextFunction
  ) => {
    userController.loginUserController(req, res, next);
  }
);

export default userRouter;
