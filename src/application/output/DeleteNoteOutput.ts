import { NoteId } from "../../domain/object/NoteId";

export class DeleteNoteOutput {
  constructor(readonly item: NoteId) {}
}
