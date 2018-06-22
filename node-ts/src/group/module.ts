"use strict";

import { Express } from "express";
import * as passport from "passport";
import * as group from "./group.service";

export function init(app: Express) {
  // Rutas de acceso a mascotas
  app
    .route("/group")
    .get(passport.authenticate("jwt", { session: false }), group.findByCurrentUser)
    .post(passport.authenticate("jwt", { session: false }), group.validateUpdate, group.update);

  app
    .route("/group/:groupId")
    .get(group.findByID, group.read)
    .put(passport.authenticate("jwt", { session: false }), group.findByID, group.validateOwner, group.validateUpdate, group.update)
    .delete(passport.authenticate("jwt", { session: false }), group.findByID, group.validateOwner, group.remove);
}