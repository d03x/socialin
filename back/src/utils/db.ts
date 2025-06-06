import { SQL } from "bun";

const db = () => {
    return new SQL(Bun.env.DATABASE_URL!, {
        max: 20, // Maximum 20 concurrent connections
        idleTimeout: 30, // Close idle connections after 30s
        maxLifetime: 3600, // Max connection lifetime 1 hour
        connectionTimeout: 10, // Connection timeout 10s 
    })

}


export default db;