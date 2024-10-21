import { Request, Response, Router } from "express";
import {
  registrerUserController,
  getUsersController,
  getUserByIdController,
  loginUserController,
} from "../controllers/userController";

import { UserRegisterDTO, UserLoginDTO } from "../dtos/UserDTO";

const userRouter: Router = Router();

userRouter.get("/", (req: Request, res: Response) =>
  getUsersController(req, res)
);

userRouter.get("/:id", (req: Request<{ id: string }>, res: Response) =>
  getUserByIdController(req, res)
);

userRouter.post(
  "/register",
  (req: Request<unknown, unknown, UserRegisterDTO>, res: Response) =>
    registrerUserController(req, res)
);

userRouter.post(
  "/login",
  (req: Request<unknown, unknown, UserLoginDTO>, res: Response) => {
    loginUserController(req, res);
  }
);

export default userRouter;
