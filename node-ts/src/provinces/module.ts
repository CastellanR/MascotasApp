"use strict";

import { Express } from "express";
import * as passport from "passport";
import * as security from "../security/security.service";
import * as province from "./province.service";

/**
 * Configura e inicializa los contenidos del Modulo
 */
export function init(app: Express) {
  // Rutas del controlador
  app.route("/province")
    .get(province.list)
    .post(passport.authenticate("jwt", { session: false }), province.validateUpdate, province.update);

  app.route("/province/:provinceId")
    .get(province.findByID, province.read)
    .delete(passport.authenticate("jwt", { session: false }), security.validateAdminRole, province.findByID, province.validateUpdate, province.remove);
}
