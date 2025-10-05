import express from "express";
import { getGroupMessages, sendGroupMessage } from "../controllers/groupMessage.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js"
const router = express.Router();


router.route("/:id")
    .post(protectedRoute, sendGroupMessage)
    .get(protectedRoute, getGroupMessages);

export default router;