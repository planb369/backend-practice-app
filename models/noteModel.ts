import db from "./db";

export const getNotesModel = (
  callback: (error: Error | null, results: any) => void
) => {
  db.query("SELECT * FROM notes", (error, results) => {
    callback(error, results);
  });
};
