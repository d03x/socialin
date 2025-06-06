import type { FastifyReply, FastifyRequest } from "fastify"

export default async function jwtMiddleware(e: FastifyRequest, p: FastifyReply) {
    try {
        await e.jwtVerify()
    } catch (error) {
        p.send(error)
    }
}