import { DeleteNoteOutput } from "../../../application/output/DeleteNoteOutput";

export class DeleteNoteResponse {
  readonly id;

  constructor(output: DeleteNoteOutput) {
    if (output.item) {
      this.id = output.item.id?.value;
    }
  }
}
