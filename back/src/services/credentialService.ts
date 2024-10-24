import bcrypt from "bcrypt";
import { Credential } from "../entities/Credentials.entity";
import { EntityManager } from "typeorm";
import { CredentialRepository } from "../repositories/Credential.Repository";
import { CustomError } from "../utils/customError";

const saltRounds = 10;
const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
    console.log(error);
  }
};

const checkUserExists = async (username: string): Promise<void> => {
  const credentialFound: Credential | null = await CredentialRepository.findOne(
    {
      where: { username },
    }
  );

  if (credentialFound) {
    throw new CustomError(404, `User ${username} already exists`);
  }
};

export const getCredentialsService = async (
  entityManager: EntityManager,
  username: string,
  password: string
): Promise<Credential> => {
  await checkUserExists(username);
  const passwordHashed = await hashPassword(password);
  const objetoCredenciales: Credential = entityManager.create(Credential, {
    username,
    password: passwordHashed,
  });

  return await entityManager.save(objetoCredenciales);
};

export const checkUserCredentials = async (
  username: string,
  password: string
): Promise<number | undefined> => {
  const credentialFound: Credential | null = await CredentialRepository.findOne(
    {
      where: { username },
    }
  );
  if (!credentialFound) {
    throw new Error("User and password don't match");
  }
  const passwordMatches = await bcrypt.compare(
    password,
    credentialFound.password
  );

  if (!passwordMatches) {
    throw new Error("User and password don't match");
  }

  return credentialFound.id;
};
