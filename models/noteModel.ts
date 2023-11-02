import db from "./db";

//データ一覧取得sql
export const getNotesModel = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM notes", (error, results) => {
      if (error) {
        //エラーならrejectを呼び出してエラー情報をPromiseに渡す
        reject(error);
      } else {
        //成功ならresolveを呼び出して結果をPromiseに渡す
        resolve(results);
      }
    });
  });
};
