"use strict";

import { Express } from "express";
import * as passport from "passport";
import * as like from "./like.service";

export function init(app: Express) {
  // Rutas de acceso a mascotas
  app
    .route("/like")
    .post(passport.authenticate("jwt", { session: false }), like.validateUpdate, like.update);
  app
    .route("/like/:likeId")
    .delete(passport.authenticate("jwt", { session: false }), like.findByID, like.remove);
  app
    .route("/likes/:petId")
    .get(passport.authenticate("jwt", { session: false }), like.findByPet);
}