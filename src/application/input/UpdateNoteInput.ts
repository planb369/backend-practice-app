import { NoteId } from "../../domain/object/NoteId";
import { Title } from "../../domain/object/Title";
import { Content } from "../../domain/object/Content";
import { Note } from "../../domain/entity/Note";

export class UpdateNoteInput {
  readonly id: NoteId;
  readonly title: Title;
  readonly content: Content;

  constructor(id: NoteId, title: Title, content: Content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  //Repositoryに渡す用のNoteEntityを生成する
  getNote() {
    const note = new Note();
    note.id = this.id;
    note.title = this.title;
    note.content = this.content;
    return note;
  }
}
