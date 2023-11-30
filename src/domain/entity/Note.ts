import { NoteId } from "../object/NoteId";

export class Note {
  id?: NoteId;
  title?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(
    id?: NoteId,
    title?: string,
    content?: string,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
