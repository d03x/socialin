import Fastify, { type FastifyInstance } from "fastify";
import fastifyCaching from "@fastify/caching";
import fastifyAccepts from "@fastify/accepts";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import { join } from "path";
import fastifyHelmet from "@fastify/helmet";
import fastifyJwt from "@fastify/jwt";
import fastifyWebsocket from "@fastify/websocket";
import route from "@/routes/routes";
import loadConfig from "@/config/env.config";
await loadConfig();
const PORT = Number(process.env.APP_PORT);
const HOST = String(process.env.APP_HOST);

const createServer = async () => {
    const server = Fastify({
        logger: process.env.HTTP_LOGGER
    })
    server.register(fastifyWebsocket);
    server.register(fastifyAccepts)
    server.register(fastifyCors, {});
    server.register(fastifyHelmet, {
        global: true,
        contentSecurityPolicy: false,
    })
    //secret key jwt
    server.register(fastifyJwt, {
        secret: Bun.env.JWT_SECRET_KEY,
    })
    server.register(fastifyCaching, { privacy: fastifyCaching.privacy.NOCACHE },)
    server.register(fastifyStatic, {
        root: join(__dirname, 'storage'),
        prefix: "/storage"
    })
    server.register(route, {
        prefix: "/api",
        logLevel: "debug"
    });
    server.setNotFoundHandler((request, reply) => {
        reply.status(404).send({
            status: 404,
            message: "Halaman tidak ditemukan atau sudah di hapus"
        })
    })
    //signal for handle application
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
    try {
        await server.listen({
            host: HOST,
            port: PORT,
        });
        console.log(`Listen ${HOST}:${PORT}`);

    } catch (e) {
        server.log.error(e);
        process.exit(1);
    }
}
process.on("unhandledRejection", (err) => {
    console.error("Unhandle rejection", err);
    process.exit(1);
})
export {
    createServer,
};