import isDocker from "is-docker";
import * as app from "./src/main";
const f = await app.build({
    logger: {
        transport: {
            target: "@fastify/one-line-logger"
        },
        file: "app.log"
    },
})
const start = async () => {
    (await import("@/utils/start")).initalizeStart()
    try {
        if (isDocker()) {
            await f.listen({ port: process.env.PORT, host: "0.0.0.0" });
        } else {
            await f.listen({ port: process.env.PORT, });
        }
    } catch (error) {
        f.log.fatal(error);
        process.exit(1);
    }

}

process.on("unhandledRejection", (error) => {
    f.log.error(error);
    process.exit(1);
})

start();
