import { AppDataSource } from "../config/data-source";
import {
  UserRegisterDTO,
  UserLoginDTO,
  UserDTO,
  UserCredentialDTO,
} from "../dtos/UserDTO";
import {
  checkUserCredentials,
  getCredentialsService,
} from "./credentialService";
import { User } from "../entities/User.entity";
import { Credential } from "../entities/Credentials.entity";
import { UserRepository } from "../repositories/User.Repository";
import { CustomError } from "../utils/customError";

export const getUserService = async (): Promise<UserDTO[]> => {
  const users: User[] = await UserRepository.find();
  return users;
};

export const getUserByIdService = async (id: string): Promise<UserDTO> => {
  const userFound = await UserRepository.findOne({
    where: { id: parseInt(id, 10) },
    relations: ["appointments"],
  });

  if (!userFound) {
    throw new CustomError(404, `User ${id} not found`);
  }
  return userFound;
};

export const registerUserService = async (
  user: UserRegisterDTO
): Promise<User> => {
  const result = await AppDataSource.transaction(async (entityManager) => {
    const userCredentials: Credential = await getCredentialsService(
      entityManager,
      user.username,
      user.password
    );
    const newUser = entityManager.create(User, {
      name: user.name,
      email: user.email,
      birthdate: new Date(user.birthdate),
      nDni: user.nDni,
      credentialsId: userCredentials,
    });
    return await entityManager.save(newUser);
  });
  return result;
};
export const loginUserService = async (
  userCredentials: UserCredentialDTO
): Promise<UserLoginDTO> => {
  const credentialId: number | undefined = await checkUserCredentials(
    userCredentials.username,
    userCredentials.password
  );

  const userFound: User | null = await UserRepository.findOne({
    where: {
      credentialsId: {
        id: credentialId,
      },
    },
  });
  return {
    login: true,
    user: {
      ...userFound,
    },
  };
};
