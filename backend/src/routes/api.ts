import type { FastifyInstance } from "fastify";

const api = (f: FastifyInstance) => {
    f.addHook("onRequest", async (req, rep) => {
        try {
            await req.jwtVerify()
        } catch (error) {
            rep.send(error)
        }
    })
    f.get("/user", (req, rep) => {
        rep.send("OKE LETSGO")
    })
}

export default api;