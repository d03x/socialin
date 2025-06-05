import type { PrismaClient } from "@prisma/client"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: any
            APP_HOST: string
            JWT_SECRET_KEY: string
            APP_PORT: number
            LOG_LEVEL:"debug"| "info"| "warn"| "error"|"silent"| "fatal",
            DATABASE_URL: string
            HTTP_LOGGER: boolean
        }
    }
}
declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient,
    }
}
export { }