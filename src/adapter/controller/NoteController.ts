import { Request, Response } from "express";

import { FindNoteRequest } from "../transfer/request/FindNoteRequest";
import { SearchNoteRequest } from "../transfer/request/SearchNotesRequest";

import { FindNoteUseCase } from "../../application/usecase/FindNoteUseCase";
import { SearchNotesUseCase } from "../../application/usecase/SearchNotesUseCase";

import { FindNoteInput } from "../../application/input/FindNoteInput";
import { SearchNotesInput } from "../../application/input/SearchNotesInput";

import { FindNoteResponse } from "../transfer/response/FindNoteResponse";
import { SearchNotesResponse } from "../transfer/response/SearchNotesResponse";

import { handleErrors } from "./errors/handleErrors";
import { HTTP_STATUS_CODES } from "./httpStatus/HTTP_STATUS_CODES";
import { htmlEscape } from "../../utilities/htmlEscape";

export class NoteController {
  constructor(
    private readonly findNoteUseCase: FindNoteUseCase,
    private readonly searchNotesUseCase: SearchNotesUseCase
  ) {}

  async find(req: Request, res: Response) {
    try {
      const request = new FindNoteRequest(req);

      const input = new FindNoteInput(request.id);
      const output = await this.findNoteUseCase.handle(input);

      const response = new FindNoteResponse(output);
      return res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
      if (error instanceof Error) {
        handleErrors(error, res);
      }
    }
  }

  async search(req: Request, res: Response) {
    try {
      const request = new SearchNoteRequest(req);

      const input = new SearchNotesInput(request.limit, request.offset);
      const output = await this.searchNotesUseCase.handle(input);

      const response = new SearchNotesResponse(output);
      return res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }

  /*
  

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

  async updateNote(req: Request, res: Response) {
    try {
      //requestで中身のバリデーション
      const request = new UpdateNoteRequest(req);
      await request.validate();

      //エスケープ処理
      const escapedTitle = htmlEscape(req.body.title);
      const escapedContent = htmlEscape(req.body.content);

      //ユースケースに渡す
      const output = await this.updateNoteUseCase.updateNote(
        req.params.id,
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

  async deleteNote(req: Request, res: Response) {
    try {
      //requestで中身のバリデーション
      const request = new DeleteNoteRequest(req.params.id);
      await request.validate();

      //ユースケースに渡す
      const output = await this.deleteNoteUseCase.deleteNote(req.params.id);

      res.status(HTTP_STATUS_CODES.OK).json(output);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }
  */
}
