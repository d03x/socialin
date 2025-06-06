import { createRouteInstance } from "../utils/route"
import AuthController from "../controllers/auth.controller";
import authController from "../controllers/auth.controller";
export default createRouteInstance((f)=>{
    f.get("/login",authController.login);
})