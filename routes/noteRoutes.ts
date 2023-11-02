import express from "express";
import * as notesController from "../controllers/noteController";

const router = express.Router();

//データの一覧取得
router.get("/api/notes", notesController.getNotes);

export default router;
