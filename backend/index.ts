import loadConfig from "@/config/env.config";
import { build } from "@/index";
import isDocker from "is-docker";
loadConfig();
const f = build({
    logger: {
        level: process.env.LOG_LEVEL,
        file: "app.log"
    }
})

const PORT = Number(process.env.APP_PORT);
const HOST = String(process.env.APP_HOST);

const start = async () => {
    const onServerStart = (err: any, address: any) => {
        if (err) {
            f.log.error(err);
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`)
    }

    try {
        if (isDocker()) {
            await f.listen({ host: "0.0.0.0", port: PORT, }, onServerStart);
        } else {
            await f.listen({ host: HOST, port: PORT, }, onServerStart);

        }
    } catch (e) {
        f.log.fatal(e)
        process.exit(1);
    }

    process.on("unhandledRejection", (err) => {
        console.error("Unhandle rejection", err);
        process.exit(1);
    })
}
start();