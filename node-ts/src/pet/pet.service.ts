"use strict";

import * as escape from "escape-html";
import * as express from "express";
import { NextFunction } from "express-serve-static-core";
import { IUserSessionRequest } from "../security/security.service";
import * as errorHandler from "../utils/error.handler";
import { IPet, Pet } from "./pet.schema";

/**
 * Retorna los datos de la mascota
 */
export interface IReadRequest extends IUserSessionRequest {
  pet: IPet;
}
export function read(req: IReadRequest, res: express.Response) {
  res.json(req.pet);
}

/**
 * @apiDefine IMascotaResponse
 *
 * @apiSuccessExample {json} Mascota
 *    {
 *      "name": "Nombre de la mascota",
 *      "description": "Descripción de la mascota",
 *      "user": "Id de usuario",
 *      "birthDate": date (DD/MM/YYYY),
 *      "updated": date (DD/MM/YYYY),
 *      "created": date (DD/MM/YYYY),
 *      "enabled": [true|false]
 *    }
 */

/**
 * @api {post} /pet Crear Mascota
 * @apiName Crear Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Crea una mascota.
 *
 * @apiExample {json} Mascota
 *    {
 *      "name": "Nombre de la mascota",
 *      "description": "Description de la mascota",
 *      "birthDate": date (DD/MM/YYYY),
 *    }
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */

/**
 * @api {put} /pet/:petId Actualizar Mascota
 * @apiName Actualizar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Actualiza los datos de una mascota.
 *
 * @apiExample {json} Mascota
 *    {
 *      "name": "Nombre de la mascota",
 *      "description": "Description de la mascota",
 *      "birthDate": date (DD/MM/YYYY),
 *    }
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
export interface IUpdateRequest extends IUserSessionRequest {
  pet: IPet;
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
  if (req.body.birthDate) {
    req.check("birthDate", "No es válido").isLength({ min: 1 });
    req.sanitize("birthDate").escape();
  }

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return errorHandler.handleExpressValidationError(res, result);
    }
    next();
  });
}
export function update(req: IUpdateRequest, res: express.Response) {
  let pet = req.pet;
  if (!pet) {
    pet = new Pet();
    pet.user = req.user._id;
  }

  if (req.body.name) {
    pet.name = req.body.name;
  }
  if (req.body.description) {
    pet.description = req.body.description;
  }
  if (req.body.birthDate) {
    pet.birthDate = req.body.birthDate;
  }

  pet.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.json(pet);
  });
}

/**
 * @api {delete} /pet/:petId Eliminar Mascota
 * @apiName Eliminar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Eliminar una mascota.
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
export interface IRemoveRequest extends IUserSessionRequest {
  pet: IPet;
}
export function remove(req: IRemoveRequest, res: express.Response) {
  const pet = <IPet>req.pet;

  pet.enabled = false;
  pet.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.send();
  });
}

/**
 * @api {get} /pet Listar Mascota
 * @apiName Listar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Obtiene un listado de las mascotas del usuario actual.
 *
 * @apiSuccessExample {json} Mascota
 *  [
 *    {
 *      "name": "Nombre de la mascota",
 *      "description": "Descripción de la mascota",
 *      "user": "Id de usuario",
 *      "birthDate": date (DD/MM/YYYY),
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
  Pet.find({
    user: req.user._id,
    enabled: true
  }).exec(function (err, pets) {
    if (err) return next();
    res.json(pets);
  });
}

/**
 * @api {put} /pet/:petId Buscar Mascota
 * @apiName Buscar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Busca una mascota por id.
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
export interface IFindByIdRequest extends express.Request {
  pet: IPet;
}
export function findByID(req: IFindByIdRequest, res: express.Response, next: NextFunction) {
  const id = req.params.petId;

  Pet.findOne({
    _id: escape(id),
    enabled: true
  },
    function (err, pet) {
      if (err) return errorHandler.handleError(res, err);

      if (!pet) {
        return errorHandler.sendError(res, errorHandler.ERROR_NOT_FOUND, "No se pudo cargar la mascota " + id);
      }

      req.pet = pet;
      next();
    });
}

/**
 * Autorización, el único que puede modificar el mascota es el dueño
 */
export interface IValidateOwnerRequest extends IUserSessionRequest {
  pet: IPet;
}
export function validateOwner(req: IValidateOwnerRequest, res: express.Response, next: NextFunction) {
  if (!((req.pet.user as any).equals(req.user._id))) {
    return errorHandler.sendError(res, errorHandler.ERROR_UNAUTHORIZED_METHOD, "User is not authorized");
  }
  next();
}
