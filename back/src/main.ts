import { fastify, type FastifyInstance, type FastifyServerOptions } from "fastify";
import * as signal from "./utils/signal";
export type FSY = FastifyInstance;
import db from "./utils/db";
import type { SQL } from "bun";
export type Server = FastifyInstance;
var database: SQL;
try {
    database = await db().connect()
} catch (error: any) {
    console.log(error.message!);
    process.exit(1)
}
//build server using fastify
const build = async (opt: FastifyServerOptions): Promise<FSY> => {
    const server: FSY = fastify(opt);
    server.register(import("@plugin/register"));
    server.register(import("@service/index"))
    server.register(import("@route/api"), { prefix: "api" })
    //handle shutdown signal
    signal.signalShutdownHandler(server, ["SIGALRM", "SIGTERM", "SIGINT"]);
    return server;
}
export {
    build,
    database
}