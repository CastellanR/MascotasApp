"use strict";

import { Express } from "express";
import * as passport from "passport";
import * as message from "./message.service";

export function init(app: Express) {
  // Rutas de acceso a mascotas
  app
    .route("/message")
    .get(passport.authenticate("jwt", { session: false }), message.findByCurrentUser)
    .post(passport.authenticate("jwt", { session: false }), message.validateUpdate, message.update);

  app
    .route("/message/:messageId")
    .get(message.findByID, message.read)
    .put(passport.authenticate("jwt", { session: false }), message.findByID, message.validateOwner, message.validateUpdate, message.update)
    .delete(passport.authenticate("jwt", { session: false }), message.findByID, message.validateOwner, message.remove);
}