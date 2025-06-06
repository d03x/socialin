import type { FastifyInstance } from "fastify";

export const createRouteInstance = (callback: (f: FastifyInstance) => void) => (f: FastifyInstance) => {
    callback(f);
}
