import type { Server } from "@/main";
export default function api(f: Server) {
    f.get("/", { websocket: true }, (ws) => {
        ws.on('message', message => {
            // message.toString() === 'hi from client'
            ws.send('hi from server')
        })
    })
    f.register(import("@route/authorized"));
    f.register(import("@route/auth"));
}