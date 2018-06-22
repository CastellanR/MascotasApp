"use strict";

import * as escape from "escape-html";
import * as express from "express";
import { NextFunction } from "express-serve-static-core";
import { IUserSessionRequest } from "../security/security.service";
import * as errorHandler from "../utils/error.handler";
import { IMessage, Message } from "./message.schema";

/**
 * Retorna los datos del grupo
 */
export interface IReadRequest extends IUserSessionRequest {
  message: IMessage;
}
export function read(req: IReadRequest, res: express.Response) {
  res.json(req.message);
}

/**
 * @apiDefine IMessageResponse
 *
 * @apiSuccessExample {json} Mensaje
 *    {
 *      "content": "Contenido del mensaje",
 *      "from": "Id de usuario",
 *      "to": "Id de usuario",
 *      "updated": date (DD/MM/YYYY),
 *      "created": date (DD/MM/YYYY),
 *    }
 */

/**
 * @api {post} /message Crear Mensaje
 * @apiName Crear Mensaje
 * @apiGroup Mensajes
 *
 * @apiDescription Crea un Mensaje.
 *
 * @apiExample {json} Mensaje
 *    {
 *      "content": "Contenido del mensaje",
 *      "created": date (DD/MM/YYYY),
 *    }
 *
 * @apiUse IMessageResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */

export interface IUpdateRequest extends IUserSessionRequest {
  message: IMessage;
}
export function validateUpdate(req: IUpdateRequest, res: express.Response, next: NextFunction) {
  if (req.body.content) {
    req.check("content", "Hasta 1024 caracteres solamente.").isLength({ max: 1024 });
    req.sanitize("content").escape();
  }

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return errorHandler.handleExpressValidationError(res, result);
    }
    next();
  });
}
export function update(req: IUpdateRequest, res: express.Response) {
  let message = req.message;
  if (!message) {
    message = new Message();
    message.from = req.user._id;
  }
  if (req.body.content) {
    message.content = req.body.content;
  }

  message.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.json(message);
  });
}

/**
 * @api {delete} /message/:messageId Eliminar Mensaje
 * @apiName Eliminar Mensaje
 * @apiGroup Mensajes
 *
 * @apiDescription Eliminar un Mensaje.
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
export interface IRemoveRequest extends IUserSessionRequest {
  message: IMessage;
}
export function remove(req: IRemoveRequest, res: express.Response) {
  const message = <IMessage>req.message;

  message.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.send();
  });
}

/**
 * @api {get} /message Listar Mensajes
 * @apiName Listar Mensajes
 * @apiGroup Mensajes
 *
 * @apiDescription Obtiene un listado de los Mensajes.
 *
 * @apiSuccessExample {json} Mensaje
 *  [
 *    {
 *      "content": "Contenido del Mensaje",
 *      "from": "Id de usuario",
 *      "to": "Id de usuario",
 *      "updated": date (DD/MM/YYYY),
 *      "created": date (DD/MM/YYYY),
 *    }, ...
 *  ]
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
export function findByCurrentUser(req: IUserSessionRequest, res: express.Response, next: NextFunction) {
  Message.find({
    from: req.user._id,
  }).exec(function (err, messages) {
    if (err) return next();
    res.json(messages);
  });
}

/**
 * @api {put} /message/:messageId Buscar Mensaje
 * @apiName Buscar Mensaje
 * @apiGroup Mensajes
 *
 * @apiDescription Busca un Mensaje por id.
 *
 * @apiUse IMessageResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
export interface IFindByIdRequest extends express.Request {
  message: IMessage;
}
export function findByID(req: IFindByIdRequest, res: express.Response, next: NextFunction) {
  const id = req.params.messageId;

  Message.findOne({
    _id: escape(id),
    enabled: true
  },
    function (err, message) {
      if (err) return errorHandler.handleError(res, err);

      if (!message) {
        return errorHandler.sendError(res, errorHandler.ERROR_NOT_FOUND, "No se pudo cargar el grupo " + id);
      }

      req.message = message;
      next();
    });
}

/**
 * Autorización, el único que puede modificar el grupo es el dueño
 */
export interface IValidateOwnerRequest extends IUserSessionRequest {
  message: IMessage;
}
export function validateOwner(req: IValidateOwnerRequest, res: express.Response, next: NextFunction) {
  if (!((req.message.from as any).equals(req.user._id))) {
    return errorHandler.sendError(res, errorHandler.ERROR_UNAUTHORIZED_METHOD, "User is not authorized");
  }
  next();
}
