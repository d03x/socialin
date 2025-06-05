import type { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";

const login = async (request: FastifyRequest, reply: FastifyReply) => {
    return {
        user: request.user
    }
}

export {
    login
}