import type { FSY } from "../main"
import jwtMiddleware from "../utils/jwtcheck"
import { createRouteInstance } from "../utils/route";
export default createRouteInstance(f => {
    f.addHook("onRequest", jwtMiddleware)
    f.get("/user", (e, f) => { return {} })
});