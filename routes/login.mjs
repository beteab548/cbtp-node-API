import { Router } from "express";
import { loginVadlidation ,registerController,newApplicationController,getApplicationData} from "../controller/login.mjs";
const router = Router();
router.post("/login", loginVadlidation);
router.post("/register", registerController);
router.post('/newApplicationRequest',newApplicationController)
router.get('/getApplicationData',getApplicationData )
export default router;
