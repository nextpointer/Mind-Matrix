import express from "express";
import { getCounselorById, addCounselor,getCounselors } from "../controllers/counsellor.controller.js";

const router = express.Router();

// Route to get counselor by ID
router.route('/:id').get(getCounselorById);
router.route('/').get(getCounselors);

// Route to add new counselor
router.route('/').post(addCounselor);

export default router;
