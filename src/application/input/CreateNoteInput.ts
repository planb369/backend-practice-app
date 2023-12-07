import { Title } from "../../domain/object/Title";
import { Content } from "../../domain/object/Content";
import { Note } from "../../domain/entity/Note";

export class CreateNoteInput {
  readonly title: Title;
  readonly content: Content;

  constructor(title: Title, content: Content) {
    this.title = title;
    this.content = content;
  }

  getNote(): Note {
    const note = new Note();
    note.title = this.title;
    note.content = this.content;
    return note;
  }
}
