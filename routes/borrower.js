import Express from "express";
import { createAccount } from "../controllers/Borrower.js   ";
import { protect } from "../middleware/auth.js";

const router = Express.Router();

router.use(protect);
router.post("/", createAccount);

export default router;
