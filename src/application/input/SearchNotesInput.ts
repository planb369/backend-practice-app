import { Notes } from "../../domain/entity/Notes";
import { Limit } from "../../domain/object/Limit";
import { Offset } from "../../domain/object/Offset";
import { QueryParams } from "../../domain/entity/QueryParams";

//useCaseで受け付けるものを定義する
export class SearchNotesInput {
  constructor(private limit: Limit, private offset: Offset) {}

  //repositoryに渡すときの形に整える
  searchNotes() {
    const queryParams = new QueryParams(this.limit, this.offset);
    return queryParams;
  }
}
