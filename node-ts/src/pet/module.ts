"use strict";

import { Express } from "express";
import * as passport from "passport";
import * as pet from "./pet.service";

export function init(app: Express) {
  // Rutas de acceso a mascotas
  app
    .route("/pet")
    .get(passport.authenticate("jwt", { session: false }), pet.findByCurrentUser)
    .post(passport.authenticate("jwt", { session: false }), pet.validateUpdate, pet.update);

  app
    .route("/pet/:petId")
    .get(pet.findByID, pet.read)
    .put(passport.authenticate("jwt", { session: false }), pet.findByID, pet.validateOwner, pet.validateUpdate, pet.update)
    .delete(passport.authenticate("jwt", { session: false }), pet.findByID, pet.validateOwner, pet.remove);
}
