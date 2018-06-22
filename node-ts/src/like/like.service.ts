"use strict";

import * as escape from "escape-html";
import * as express from "express";
import { NextFunction } from "express-serve-static-core";
import { IUserSessionRequest } from "../security/security.service";
import * as errorHandler from "../utils/error.handler";
import { ILike, Like } from "./like.schema";

/**
 * Retorna los datos del grupo
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
  if (!like) {
    like = new Like();
    like.from = req.user._id;
  }

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

  like.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.send();
  });
}

/**
 * @api {get} /like Listar Likes
 * @apiName Listar Likes
 * @apiGroup Likes
 *
 * @apiDescription Obtiene un listado de los Likes.
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
export function findByCurrentUser(req: IUserSessionRequest, res: express.Response, next: NextFunction) {
  Like.find({
    from: req.user._id,
  }).exec(function (err, likes) {
    if (err) return next();
    res.json(likes);
  });
}

/**
 * Autorización, el único que puede modificar el grupo es el dueño
 */
export interface IValidateOwnerRequest extends IUserSessionRequest {
  like: ILike;
}
export function validateOwner(req: IValidateOwnerRequest, res: express.Response, next: NextFunction) {
  if (!((req.like.from as any).equals(req.user._id))) {
    return errorHandler.sendError(res, errorHandler.ERROR_UNAUTHORIZED_METHOD, "User is not authorized");
  }
  next();
}
