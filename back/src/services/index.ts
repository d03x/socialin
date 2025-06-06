import type { FastifyInstance } from "fastify"
import fp from "fastify-plugin"
declare module "fastify" {
    interface FastifyInstance {
        services: {
            email: string
        }
    }
}
/**
 * bagian dari service ini
 */
export default fp((f) => {
    f.decorate("services", {
        email: "DADAN"
    })
}, { name: "Plugin" })