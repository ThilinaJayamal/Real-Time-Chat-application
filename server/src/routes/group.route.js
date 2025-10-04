import express from "express"
import { createGroup, getGroups } from "../controllers/group.controller.js";
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route("/")
    .get(protectedRoute, getGroups)
    .post(protectedRoute, createGroup);

export default router;

