import { Router } from "express";
import { loginVadlidation ,registerController} from "../controller/login.mjs";
const router = Router();
router.post("/login", loginVadlidation);
router.post("/register", registerController);
export default router;
