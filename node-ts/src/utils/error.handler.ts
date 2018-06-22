"use strict";

import * as express from "express";
import { NextFunction } from "express-serve-static-core";
import { Result } from "express-validator/shared-typings";

export const ERROR_UNAUTHORIZED = 401;
export const ERROR_NOT_FOUND = 404;
export const ERROR_UNAUTHORIZED_METHOD = 405;
export const ERROR_BAD_REQUEST = 400;
export const ERROR_INTERNAL_ERROR = 500;

export interface ValidationErrorItem {
  path: string;
  message: string;
}
export interface ValidationErrorMessage {
  error?: string;
  messages?: ValidationErrorItem[];
}

// Error desconocido
function processUnknownError(res: express.Response, err: any): ValidationErrorMessage {
  res.status(ERROR_INTERNAL_ERROR);
  res.setHeader("X-Status-Reason", "Unknown error");
  return { error: err };
}

// Obtiene un error adecuando cuando hay errores de db
function processMongooseErrorCode(res: express.Response, err: any): ValidationErrorMessage {
  res.status(ERROR_BAD_REQUEST);

  try {
    switch (err.code) {
      case 11000:
      case 11001:
        res.setHeader("X-Status-Reason", "Unique constraint");

        const fieldName = err.errmsg.substring(
          err.errmsg.lastIndexOf("index:") + 7,
          err.errmsg.lastIndexOf("_1")
        );
        return {
          messages: [{
            path: fieldName,
            message: "Este registro ya existe."
          }]
        };
      default:
        res.status(ERROR_BAD_REQUEST);
        res.setHeader("X-Status-Reason", "Unknown database error code:" + err.code);
        return { error: err };
    }
  } catch (ex) {
    res.status(ERROR_INTERNAL_ERROR);
    res.setHeader("X-Status-Reason", "Unknown database error");
    return { error: err };
  }
}

// Error de validación de datos
function processValidationError(res: express.Response, err: any): ValidationErrorMessage {
  res.setHeader("X-Status-Reason", "Validation failed");
  res.status(ERROR_BAD_REQUEST);
  const messages: ValidationErrorItem[] = [];
  for (const key in err.errors) {
    messages.push({
      path: key,
      message: err.errors[key].message
    });
  }
  return {
    messages: messages
  };
}


/**
 * @apiDefine ParamValidationErrors
 *
 * @apiErrorExample {json} 400 Bad Request
 *     HTTP/1.1 400 Bad Request
 *     HTTP/1.1 Header X-Status-Reason: {Message}
 *     {
 *        "messages" : [
 *          {
 *            "path" : "propertyName",
 *            "message" : "Error Text"
 *          },
 *          ...
 *       ]
 *     }
 */

/**
 * @apiDefine 200OK
 *
 * @apiSuccessExample {json} Response
 *     HTTP/1.1 200 OK
 */

/**
 * @apiDefine OtherErrors
 *
 * @apiErrorExample {json} 404 Not Found
 *     HTTP/1.1 404 Not Found
 *     HTTP/1.1 Header X-Status-Reason: {Message}
 *     {
 *        "url" : "http://...",
 *        "error" : "Not Found"
 *     }
 *
 * @apiErrorExample {json} 500 Server Error
 *     HTTP/1.1 500 Internal Server Error
 *     HTTP/1.1 Header X-Status-Reason: {Message}
 *     {
 *        "error" : "Not Found"
 *     }
 */
export function handleError(res: express.Response, err: any): express.Response {
  if (err.code) {   // Database Error
    return res.send(processMongooseErrorCode(res, err));
  } else if (err.errors) {  // ValidationError
    return res.send(processValidationError(res, err));
  } else {
    return res.send(processUnknownError(res, err));
  }
}

export function sendError(res: express.Response, code: number, err: string) {
  res.status(code);
  res.setHeader("X-Status-Reason", err);
  return res.send({ error: err });
}

export function handleExpressValidationError(res: express.Response, err: Result): express.Response {
  res.setHeader("X-Status-Reason", "Validation failed");
  res.status(ERROR_BAD_REQUEST);
  const messages: ValidationErrorItem[] = [];
  for (const error of err.array({ onlyFirstError: true })) {
    messages.push({
      path: error.param,
      message: error.msg
    });
  }
  return res.send({ messages: messages });
}

// Controla errores
export function logErrors(err: any, req: express.Request, res: express.Response, next: NextFunction) {
  if (!err) return next();

  console.error(err.message);

  res.status(err.status || ERROR_INTERNAL_ERROR);
  res.json({
    error: err.message
  });
}


export function handle404(req: express.Request, res: express.Response) {
  res.status(ERROR_NOT_FOUND);
  res.json({
    url: req.originalUrl,
    error: "Not Found"
  });
}
