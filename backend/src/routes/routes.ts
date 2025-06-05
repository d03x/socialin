import type { FastifyInstance } from "fastify";
import * as auth from "@/controllers/auth.controller";
const route = (api: FastifyInstance) => {
    api.get("/login", auth.login);
}
export default route;