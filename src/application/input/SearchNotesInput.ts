import { Notes } from "../../domain/entity/Notes";

//usecaseへのインプットの形を決める

//limitとoffsetのパラメータをstringで
export type QueryParams = {
  limit: string;
  offset: string;
};

//SearchNotesInputクラス
//上の型定義を引数としたコンストラクタ
export class SearchNotesInput {
  constructor(private queryParams: QueryParams) {}

  //searchNotes関数
  searchNotes() {
    const notes = new Notes([], 0);
    //entityで定義したNotesをインスタンス化して返却
    return notes;
  }
}
