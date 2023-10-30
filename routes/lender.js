import Express from "express";
import { createAccount, fetchProfile } from "../controllers/lender.js";
import { protect } from "../middleware/auth.js";

const router = Express.Router();

router.use(protect);
router.post("/", createAccount).get(fetchProfile);

export default router;
