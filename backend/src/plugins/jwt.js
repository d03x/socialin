import fastifyJwt from "@fastify/jwt"
import fp from "fastify-plugin"
//plugin fastify jwt
export default fp(async (f) => {
    f.register(fastifyJwt, {
        secret: Bun.env.JWT_SECRET_KEY,
    })
})  