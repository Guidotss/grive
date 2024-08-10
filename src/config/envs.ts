import * as joi from "joi";
import * as dotenv from "dotenv";
dotenv.config();

interface IEnvsVars {
  PORT: number;
  NODE_ENV: string;
  JWT_SECRET: string;
}

const envsSchemas = joi
  .object<IEnvsVars>({
    PORT: joi.number().required().default(8080),
    JWT_SECRET: joi.string().required()
  })
  .unknown(true);

const { error, value } = envsSchemas.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVar: IEnvsVars = value;

export const envs = {
  PORT: envsVar.PORT,
  NODE_ENV: envsVar.NODE_ENV,
  JWT_SECRET: envsVar.JWT_SECRET,
};
