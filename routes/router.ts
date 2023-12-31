import express from "express";
import { NoteController } from "../controllers/NoteController";
const router = express.Router();

//NoteController のインスタンスを作成
const noteController = new NoteController();

//データの一覧取得
router.get("/api/notes", (req, res) => {
  //noteControllerからgetNotesメソッドを実行
  noteController.getNotes(req, res);
});

//データの詳細取得
router.get("/api/notes/:id", (req, res) => {
  noteController.getNoteDetails(req, res);
});

//データ投稿
router.post("/api/notes", (req, res) => {
  noteController.createNote(req, res);
});

//編集
router.put("/api/notes/:id", (req, res) => {
  noteController.updateNote(req, res);
});

//削除
router.delete("/api/notes/:id", (req, res) => {
  noteController.deleteNote(req, res);
});

export default router;
