import { QueryParams } from "../../domain/entity/QueryParams";

//useCaseで受け付けるものを定義する
export class SearchNotesInput {
  constructor(private queryParam: QueryParams) {}

  //repositoryに渡すときの形に整える
  searchNotes() {
    const queryParams = new QueryParams(
      this.queryParam.limit,
      this.queryParam.offset
    );
    return queryParams;
  }
}