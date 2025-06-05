import type { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";

const login = async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send("OKE");
}

export {
    login
}