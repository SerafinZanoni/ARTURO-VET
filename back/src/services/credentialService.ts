import { Credential } from "../interFaces/CredentialsInterface";
import bcrypt from "bcrypt";

const credentialsList: Credential[] = [];
let id: number = 1;

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

const checkUserExists = (username: string): void => {
  const credentialFound: Credential | undefined = credentialsList.find(
    (credential) => credential.username === username
  );
  if (credentialFound) {
    throw new Error(`User ${username} already exists`);
  }
};

export const getCredentialsService = async (
  username: string,
  password: string
): Promise<number> => {
  checkUserExists(username);
  const passwordHashed = await hashPassword(password);
  const objetoCredenciales = {
    id,
    username,
    password: passwordHashed,
  };

  credentialsList.push(objetoCredenciales);
  return id++;
};

export const checkUserCredentials = async (
  username: string,
  password: string
): Promise<number | undefined> => {
  const credentialFound: Credential | undefined = credentialsList.find(
    (credential) => credential.username === username
  );
  const passwordEncrypted = await hashPassword(password);
  return credentialFound?.password === passwordEncrypted
    ? credentialFound.id
    : undefined;
};
