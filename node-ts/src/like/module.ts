"use strict";

import { Express } from "express";
import * as passport from "passport";
import * as like from "./like.service";

export function init(app: Express) {
  // Rutas de acceso a mascotas
  app
    .route("/like")
    .get(passport.authenticate("jwt", { session: false }), like.findByCurrentUser)
    .post(passport.authenticate("jwt", { session: false }), like.validateUpdate, like.update);

  app
    .route("/like/:likeId")
    .get(like.read)
    .put(passport.authenticate("jwt", { session: false }), like.validateOwner, like.validateUpdate, like.update)
    .delete(passport.authenticate("jwt", { session: false }), like.validateOwner, like.remove);
}