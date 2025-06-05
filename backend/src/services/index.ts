import fp from "fastify-plugin"
declare module "fastify" {
    interface FastifyInstance {
        services: {
            mail: string
        }
    }
}
export default fp(async (f) => {
    f.decorate('services', {
        mail: "DADAN"
    })
})