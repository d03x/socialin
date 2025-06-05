import Fastify, { fastify, type FastifyInstance, type FastifyServerOptions } from "fastify";
import fastifyCaching from "@fastify/caching";
import fastifyAccepts from "@fastify/accepts";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import { dirname, join } from "path";
import fastifyHelmet from "@fastify/helmet";
import fastifyJwt from "@fastify/jwt";
import fastifyWebsocket from "@fastify/websocket";
import route from "@/routes/routes";
import services from "./services";
import { fileURLToPath } from "url";
import fastifyAutoload from "@fastify/autoload";
import api from "./routes/api";
import fastifyPlugin from "fastify-plugin";

const dir = dirname(fileURLToPath(import.meta.url))
/**
 * 
 * @param opt FastifyServerOptions
 * @returns FastifyInstance
 */
const build = (opt: FastifyServerOptions): FastifyInstance => {
    const server: FastifyInstance = Fastify(opt)
    server.register(fastifyWebsocket);
    server.register(fastifyAccepts)
    server.register(fastifyCors, {});
    server.register(fastifyHelmet, {
        global: true,
        contentSecurityPolicy: false,
    })
    server.register(fastifyCaching, { privacy: fastifyCaching.privacy.NOCACHE },)
    server.register(fastifyStatic, {
        root: join(__dirname, 'storage'),
        prefix: "/storage"
    })
    server.register(fastifyAutoload, {
        dir: join(dir, "plugins")
    })

    server.register(services);
    server.register(route, { prefix: "/api", logLevel: "debug", });
    server.register(api, { prefix: "/api", logLevel: "debug", });
    server.setNotFoundHandler((request, reply) => {
        reply.status(404).send({
            status: 404,
            message: "Halaman tidak ditemukan atau sudah di hapus"
        })
    })
    const signals: NodeJS.Signals[] = ["SIGINT", "SIGALRM"];
    signals.forEach((signal) => {
        process.on(signal, async () => {
            try {
                await server.close();
                console.log(`Server telah berhenti: ${signal}`);
                process.exit(0);
            } catch (error) {
                console.log(`Error: ada kesalahan saat server berhenti${signal}`);
                process.exit(1);
            }
        })
    })
    return server;
}

export {
    build,
};