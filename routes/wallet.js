import express from "express";
import { fundWallet, withdrawFund } from "../controllers/wallet.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
// get all loans, basically for loan counts only admins can do this
router.post("/fund", fundWallet);
router.post("/withdraw", withdrawFund);

export default router;
