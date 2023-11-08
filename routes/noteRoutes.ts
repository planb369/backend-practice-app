import express from "express";
import { NoteController } from "../controllers/noteController";

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
  //クエリパラメータから取得
  const id = req.params.id;
  noteController.getNoteDetails(req, res, id);
});

export default router;
