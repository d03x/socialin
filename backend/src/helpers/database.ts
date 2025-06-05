import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "@/db/schema"
const db = drizzle(Bun.env.DATABASE_URL,{schema : schema,mode:"planetscale"})

export default db;