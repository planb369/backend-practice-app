import { NoteId } from "../object/NoteId";
import { Title } from "../object/Title";
import { Content } from "../object/Content";
import { CreatedAt } from "../object/CreatedAt";
import { UpdatedAt } from "../object/UpdatedAt";

export class Note {
  id?: NoteId;
  title?: Title;
  content?: Content;
  createdAt?: CreatedAt;
  updatedAt?: UpdatedAt;

  constructor(
    id?: NoteId,
    title?: Title,
    content?: Content,
    createdAt?: CreatedAt,
    updatedAt?: UpdatedAt
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
