import { Request, Response } from "express";
import { SearchNotesUseCase } from "../../application/usecase/SearchNotesUseCase";
import { SearchNotesRequest } from "../transfer/request/SearchNotesRequest";
import { SearchNotesResponse } from "../transfer/response/SearchNotesResponse";
import { FindNoteRequest } from "../transfer/request/FindNoteRequest";
import { FindNoteUseCase } from "../../application/usecase/FindNoteUseCase";
import { CreateNoteRequest } from "../transfer/request/CreateNoteRequest";
import { CreateNoteUseCase } from "../../application/usecase/CreateNoteUseCase";
import { handleErrors } from "./errors/handleErrors";
import { HTTP_STATUS_CODES } from "./httpStatus/HTTP_STATUS_CODES";
import { htmlEscape } from "../../utilities/htmlEscape";

export class NoteController {
  searchNotesUseCase = new SearchNotesUseCase();
  findNoteUseCase = new FindNoteUseCase();
  createNoteUseCase = new CreateNoteUseCase();

  async getNotes(req: Request, res: Response) {
    try {
      //requestでバリデーション
      const request = new SearchNotesRequest(
        parseInt(req.query.limit as string) || 50,
        parseInt(req.query.offset as string) || 0
      );
      request.validate();

      //ユースケースに渡す
      const output = await this.searchNotesUseCase.getNotes(
        request.limit,
        request.offset
      );

      //responseで整形して返却
      const response = new SearchNotesResponse(output.notes, output.total);
      res.status(HTTP_STATUS_CODES.OK).json(response.convertToJson());
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }

  async getNoteDetails(req: Request, res: Response) {
    const id = req.params.id;

    try {
      //requestでidのバリデーション
      const request = new FindNoteRequest(id);
      await request.validate();

      //ユースケースに渡す
      const output = await this.findNoteUseCase.findNote(request.id);

      res.status(HTTP_STATUS_CODES.OK).json(output.note);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }

  async createNote(req: Request, res: Response) {
    try {
      //requestで中身のバリデーション
      const request = new CreateNoteRequest(req);
      await request.validate();

      //エスケープ処理
      const escapedTitle = htmlEscape(req.body.title);
      const escapedContent = htmlEscape(req.body.content);

      //ユースケースに渡す
      const output = await this.createNoteUseCase.createNote(
        escapedTitle,
        escapedContent
      );

      res.status(HTTP_STATUS_CODES.CREATED).json(output);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }
}
