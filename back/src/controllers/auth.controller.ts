import { database } from "@/main";
import type { FastifyReply, FastifyRequest } from "fastify";

class AuthController {
    login(req: FastifyRequest, reply: FastifyReply) {
        const data = database`SELECT * FROM users`.execute()
        data.then((e) => {
            reply.view("src/view/index.ejs", {
                title: "OKE",
                data:e,
            })
        })
    }
}

export default new AuthController;