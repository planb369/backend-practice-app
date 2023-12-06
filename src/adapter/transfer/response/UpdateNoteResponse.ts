import { UpdateNoteOutput } from "../../../application/output/UpdateNoteOutput";

export class UpdateNoteResponse {
  readonly id;

  constructor(output: UpdateNoteOutput) {
    if (output.item) {
      this.id = output.item.id?.value;
    }
  }
}
