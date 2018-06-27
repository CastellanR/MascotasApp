"use strict";

import { Express } from "express";
import * as passport from "passport";
import * as message from "./message.service";

export function init(app: Express) {
  // Rutas de acceso a mascotas
  app
    .route("/message")
    .get(passport.authenticate("jwt", { session: false }), message.findAll)
    .post(passport.authenticate("jwt", { session: false }), message.validateUpdate, message.update);

  app
    .route("/message/:messageId")
    .delete(passport.authenticate("jwt", { session: false }), message.findByID, message.remove);
}