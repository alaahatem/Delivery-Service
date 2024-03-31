import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import {keys,pick} from 'ramda'
export const schemaObject = {
  MONGODB_URL: Joi.string().uri().required(),
  PORT: Joi.number().integer().min(1).max(65535).optional(),
};

dotenv.config();

const schema = Joi.object(schemaObject);
const environmentVariables = keys(schemaObject);
const environmentValues = pick(environmentVariables, process.env);
const { error, value } = schema.validate(environmentValues);
if (error) {
  throw new Error(`Environment variable validation error: ${error.message}`);
}
export const PORT = value.PORT
export const MONGODB_URL = value.MONGODB_URL