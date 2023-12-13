import { NoteId } from "../../domain/object/NoteId";

export class UpdateNoteOutput {
  constructor(readonly item: NoteId | null) {}
}
