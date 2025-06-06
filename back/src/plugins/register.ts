import fastifyJwt, { type FastifyJWTOptions } from "@fastify/jwt";
import fp from "fastify-plugin"
import type { JwtPayload, JwtUser } from "../types/jwt";
import type { FastifyRegister, FastifyReply, FastifyRequest } from "fastify";
import fastifyCaching from "@fastify/caching";
import fastifyCors from "@fastify/cors";
import fastifyRateLimit from "@fastify/rate-limit";
declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (opts: any) => void,
    }
    interface FastifyRequest {
        authenticate: FastifyInstance["authenticate"],
    }
}
declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: JwtUser,
        payload: JwtPayload,
    }
}


export default fp(async (f) => {
    f.register(import("@fastify/accepts"), {});
    f.register(import("@fastify/cors"), {
        origin: "*"
    })
    f.register(fastifyRateLimit, {
        max: 20,
        timeWindow: "1 minute"
    })
    f.register(import("@fastify/view"), {
        engine: {
            ejs: import("ejs")
        }
    })
    f.register(fastifyJwt, { secret: "abcdfghijklmnopq" })
    f.register(import("@fastify/caching"), {
        privacy: fastifyCaching.privacy.NOCACHE,
    })
    f.register(import("@fastify/websocket"))
    f.decorate("authenticate", function (e) {
        return async (e: FastifyRegister, rep: FastifyReply) => {
            rep.send("Wellcome")
        }
    })
}, { name: "OKY" })