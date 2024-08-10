import * as joi from "joi";
import * as dotenv from "dotenv";
dotenv.config();

interface IEnvsVars {
  PORT: number;
  TS_NODE_DEV: boolean;
  JWT_SECRET: string;
  STORJ_S3_ACCESS_KEY: string;
  STORJ_S3_SECRET_KEY: string;
  STORJ_GATEWAY_ENDPOINT: string;
  STORJ_SHARED_ENDPOINT: string;
}

const envsSchemas = joi
  .object<IEnvsVars>({
    PORT: joi.number().required().default(8080),
    TS_NODE_DEV: joi.boolean().required(),
    JWT_SECRET: joi.string().required(),
    STORJ_S3_ACCESS_KEY: joi.string().required(),
    STORJ_S3_SECRET_KEY: joi.string().required(),
    STORJ_GATEWAY_ENDPOINT: joi.string().required(),
    STORJ_SHARED_ENDPOINT: joi.string().required(),
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
  TS_NODE_DEV: envsVar.TS_NODE_DEV,
  JWT_SECRET: envsVar.JWT_SECRET,
  STORJ_S3_ACCESS_KEY: envsVar.STORJ_S3_ACCESS_KEY,
  STORJ_S3_SECRET_KEY: envsVar.STORJ_S3_SECRET_KEY,
  STORJ_GATEWAY_ENDPOINT: envsVar.STORJ_GATEWAY_ENDPOINT,
  STORJ_SHARED_ENDPOINT: envsVar.STORJ_SHARED_ENDPOINT,
};
