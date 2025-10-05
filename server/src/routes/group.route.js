import express from "express"
import { createGroup, getGroup, getGroups, updateGroup } from "../controllers/group.controller.js";
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route("/")
    .get(protectedRoute, getGroups)
    .post(protectedRoute, createGroup)

router.route("/:id")
    .get(protectedRoute, getGroup)
    .put(protectedRoute, updateGroup);

export default router;

