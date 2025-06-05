import { readFile } from "fs";
import Joi from "joi";
import path from "path";

export default async function loadConfig(): Promise<void> {
    const env = await Bun.file(".env");
    if (!(await env.exists())) {
        throw new Error("Aduhh ada kesalahan teknis")
    }
    const schema = Joi.object({
        APP_HOST: Joi.string().required(),
        JWT_SECRET_KEY: Joi.string().required(),
        LOG_LEVEL: Joi.string().valid("debug", "info", "warn", "error","silent", "fatal").required(),
        APP_PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        HTTP_LOGGER: Joi.boolean().required(),
    }).unknown(true);

    const { error } = schema.validate(process.env, { abortEarly: false })
    if (error) {
        throw new Error(`Configuration error ${error}`);
    }
}
