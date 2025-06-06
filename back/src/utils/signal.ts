import type { FastifyInstance } from "fastify";
import { database } from "../main";

export const signalShutdownHandler = (server: FastifyInstance, signals: NodeJS.Signals[]) => {
    signals.forEach(e => {
        process.on(e, async () => {
            database.end();
            try {
                await server.close();
                console.log(`Server SHUTDOWN[${e}]`);
                process.exit(0);
            } catch (error) {
                console.log(`Failed Server SHUTDOWN[${e}]`);
                process.exit(1);
            }
        });
    })
}