"use strict";

import * as escape from "escape-html";
import * as express from "express";
import { NextFunction } from "express-serve-static-core";
import { IUserSessionRequest } from "../security/security.service";
import * as errorHandler from "../utils/error.handler";
import { IGroup, Group } from "./group.schema";

/**
 * Retorna los datos del grupo
 */
export interface IReadRequest extends IUserSessionRequest {
  group: IGroup;
}
export function read(req: IReadRequest, res: express.Response) {
  res.json(req.group);
}

/**
 * @apiDefine IGrupoResponse
 *
 * @apiSuccessExample {json} Grupo
 *    {
 *      "name": "Nombre del grupo",
 *      "description": "Descripción del grupo",
 *      "owner": "Id de usuario",
 *      "users": [user]
 *      "updated": date (DD/MM/YYYY),
 *      "created": date (DD/MM/YYYY),
 *      "enabled": [true|false]
 *    }
 */

/**
 * @api {post} /group Crear Grupo
 * @apiName Crear Grupo
 * @apiGroup Grupos
 *
 * @apiDescription Crea un Grupo.
 *
 * @apiExample {json} Grupo
 *    {
 *      "name": "Nombre del Grupo",
 *      "description": "Descripcion del Grupo",
 *    }
 *
 * @apiUse IGrupoResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */

/**
 * @api {put} /group/:groupId Actualizar Grupo
 * @apiName Actualizar Grupo
 * @apiGroup Grupos
 *
 * @apiDescription Actualiza los datos de un Grupo.
 *
 * @apiExample {json} Grupo
 *    {
 *      "name": "Nombre del Grupo",
 *      "description": "Descripcion del Grupo",
 *    }
 *
 * @apiUse IGrupoResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
export interface IUpdateRequest extends IUserSessionRequest {
  group: IGroup;
}
export function validateUpdate(req: IUpdateRequest, res: express.Response, next: NextFunction) {
  if (req.body.name) {
    req.check("name", "Hasta 256 caracteres solamente.").isLength({ max: 256 });
    req.sanitize("name").escape();
  }
  if (req.body.description) {
    req.check("description", "Hasta 1024 caracteres solamente.").isLength({ max: 1024 });
    req.sanitize("description").escape();
  }

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return errorHandler.handleExpressValidationError(res, result);
    }
    next();
  });
}
export function update(req: IUpdateRequest, res: express.Response) {
  let group = req.group;
  if (!group) {
    group = new Group();
    group.owner = req.user._id;
  }

  if (req.body.name) {
    group.name = req.body.name;
  }
  if (req.body.description) {
    group.description = req.body.description;
  }

  group.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.json(group);
  });
}

/**
 * @api {delete} /group/:groupId Eliminar Grupo
 * @apiName Eliminar Grupo
 * @apiGroup Grupos
 *
 * @apiDescription Eliminar un Grupo.
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
export interface IRemoveRequest extends IUserSessionRequest {
  group: IGroup;
}
export function remove(req: IRemoveRequest, res: express.Response) {
  const group = <IGroup>req.group;

  group.enabled = false;
  group.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.send();
  });
}

/**
 * @api {get} /group Listar Grupo
 * @apiName Listar Grupo
 * @apiGroup Grupos
 *
 * @apiDescription Obtiene un listado de los Grupos.
 *
 * @apiSuccessExample {json} Grupo
 *  [
 *    {
 *      "name": "Nombre del Grupo",
 *      "description": "Descripción del Grupo",
 *      "owner": "Id de usuario",
 *      "users": [user],
 *      "updated": date (DD/MM/YYYY),
 *      "created": date (DD/MM/YYYY),
 *      "enabled": [true|false]
 *    }, ...
 *  ]
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
export function findByCurrentUser(req: IUserSessionRequest, res: express.Response, next: NextFunction) {
  Group.find({
    user: req.user._id,
    enabled: true
  }).exec(function (err, groups) {
    if (err) return next();
    res.json(groups);
  });
}

/**
 * @api {put} /group/:groupId Buscar Grupo
 * @apiName Buscar Grupo
 * @apiGroup Grupos
 *
 * @apiDescription Busca un grupo por id.
 *
 * @apiUse IGrupoResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
export interface IFindByIdRequest extends express.Request {
  group: IGroup;
}
export function findByID(req: IFindByIdRequest, res: express.Response, next: NextFunction) {
  const id = req.params.groupId;

  Group.findOne({
    _id: escape(id),
    enabled: true
  },
    function (err, group) {
      if (err) return errorHandler.handleError(res, err);

      if (!group) {
        return errorHandler.sendError(res, errorHandler.ERROR_NOT_FOUND, "No se pudo cargar el grupo " + id);
      }

      req.group = group;
      next();
    });
}

/**
 * Autorización, el único que puede modificar el grupo es el dueño
 */
export interface IValidateOwnerRequest extends IUserSessionRequest {
  group: IGroup;
}
export function validateOwner(req: IValidateOwnerRequest, res: express.Response, next: NextFunction) {
  if (!((req.group.owner as any).equals(req.user._id))) {
    return errorHandler.sendError(res, errorHandler.ERROR_UNAUTHORIZED_METHOD, "User is not authorized");
  }
  next();
}
