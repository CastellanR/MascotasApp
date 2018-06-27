"use strict";

import * as escape from "escape-html";
import * as express from "express";
import { NextFunction } from "express-serve-static-core";
import { IUserSessionRequest } from "../security/security.service";
import * as errorHandler from "../utils/error.handler";
import { ILike, Like } from "./like.schema";

/**
 * Retorna los datos del Like
 */
export interface IReadRequest extends IUserSessionRequest {
  like: ILike;
}
export function read(req: IReadRequest, res: express.Response) {
  res.json(req.like);
}

/**
 * @apiDefine ILikeResponse
 *
 * @apiSuccessExample {json} Like
 *    {
 *      "from": "Id de usuario",
 *      "to": "Id de mascota",
 *      "created": date (DD/MM/YYYY),
 *    }
 */

/**
 * @api {post} /like Crear Like
 * @apiName Crear Like
 * @apiGroup Likes
 *
 * @apiDescription Crea un Like.
 *
 * @apiExample {json} Like
 *    {
 *      "from": "id del Usuario",
 *      "created": date (DD/MM/YYYY),
 *    }
 *
 * @apiUse ILikeResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */

export interface IUpdateRequest extends IUserSessionRequest {
  like: ILike;
}
export function validateUpdate(req: IUpdateRequest, res: express.Response, next: NextFunction) {
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return errorHandler.handleExpressValidationError(res, result);
    }
    next();
  });
}
export function update(req: IUpdateRequest, res: express.Response) {
  let like = req.like;
  like = new Like();
  like.from = req.body.from;
  like.to = req.body.to;

  like.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.json(like);
  });
}

/**
 * @api {delete} /like/:likeId Eliminar Like
 * @apiName Eliminar Like
 * @apiGroup Likes
 *
 * @apiDescription Eliminar un Like.
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
export interface IRemoveRequest extends IUserSessionRequest {
  like: ILike;
}
export function remove(req: IRemoveRequest, res: express.Response) {
  const like = <ILike>req.like;

  like.enabled = false;
  like.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);
    res.send();
  });
}

/**
 * @api {get} /likes/:id Listar Likes
 * @apiName Listar Likes
 * @apiGroup Likes
 *
 * @apiDescription Obtiene un listado de los likes por mascota.
 *
 * @apiSuccessExample {json} Like
 *  [
 *    {
 *      "from": "Id de usuario",
 *      "to": "Id de mascota",
 *      "created": date (DD/MM/YYYY),
 *    }, ...
 *  ]
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */


export function findByPet(req: IUserSessionRequest, res: express.Response, next: NextFunction) {
  const id = req.params.petId;
  Like.find({
    to: id,
    enabled: true,
  }).exec(function (err, likes) {
    if (err) return next();
    res.json(likes);
  });
}

export interface IFindByIdRequest extends express.Request {
  like: ILike;
}

export function findByID(req: IFindByIdRequest, res: express.Response, next: NextFunction) {
  const id = req.params.likeId;

  Like.findOne({
    _id: escape(id),
    enabled: true,
  },
    function (err, like) {
      if (err) return errorHandler.handleError(res, err);

      if (!like) {
        return errorHandler.sendError(res, errorHandler.ERROR_NOT_FOUND, "No se pudo cargar el Like " + id);
      }
      req.like = like;
      next();
    });
}