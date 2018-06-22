"use strict";

import { Express } from "express";
import * as passport from "passport";
import * as image from "./image.service";

export function init(app: Express) {
  // Rutas de acceso a mascotas
  app
    .route("/image")
    .post(passport.authenticate("jwt", { session: false }), image.validateCreate, image.create);

  app
    .route("/image/:imageId")
    .get(image.findByID, image.read);
}
