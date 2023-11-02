import express from "express";
import { NoteController } from "../controllers/noteController";

const router = express.Router();

//データの一覧取得
router.get("/api/notes", NoteController.getNotes);

export default router;
