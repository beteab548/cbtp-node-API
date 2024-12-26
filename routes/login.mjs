import { Router } from "express";
import { loginVadlidation ,registerController,newApplicationController} from "../controller/login.mjs";
const router = Router();
router.post("/login", loginVadlidation);
router.post("/register", registerController);
router.post('/newApplicationRequest',newApplicationController)
export default router;
