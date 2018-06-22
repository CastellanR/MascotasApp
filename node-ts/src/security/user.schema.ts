"use strict";

import * as crypto from "crypto";
import * as mongoose from "mongoose";
import * as appConfig from "../utils/environment";
const conf = appConfig.getConfig(process.env);

/*
  Por definición es el usuario que permite el login.
*/

export interface IUser extends mongoose.Document {
  name: string;
  login: string;
  password: string;
  roles: string[];
  updated: Number;
  created: Number;
  enabled: Boolean;
  authenticate: Function;
  setPasswordText: Function;
}

/**
 * Validación para tamaño de contraseña
 */
const validateLocalStrategyPassword = function (password: string) {
  return password && password.length > 6;
};

/**
 * Esquea de un usuario del sistema
 */
export let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: "",
    required: "El nombre de usuario es requerido"
  },
  login: {
    type: String,
    unique: "El login ya existe",
    required: "El login es requerido",
    trim: true
  },
  password: {
    type: String,
    default: "",
    required: "La contraseña es requerida"
  },
  roles: {
    type: [
      {
        type: String,
        enum: ["user", "admin"]
      }
    ],
    default: ["user"]
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  created: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "users" });

UserSchema.path("password").validate(function (value: string) {
  return validateLocalStrategyPassword(value);
}, "La contraseña debe ser mayor a 6 caracteres");



/**
 * Trigger antes de guardar, si el password se modifico hay que encriptarlo
 */
UserSchema.pre("save", function (this: IUser, next) {
  this.updated = Date.now();

  next();
});

/**
 * Crea un hash del password
 */
UserSchema.methods.hashPassword = function (password: string) {
  return crypto
    .pbkdf2Sync(password, conf.passwordSalt, 10000, 64, "SHA1")
    .toString("base64");
};

UserSchema.methods.setPasswordText = function (password: string) {
  this.password = this.hashPassword(password);
};

/**
 * Autentica un usuario
 */
UserSchema.methods.authenticate = function (password: string) {
  return this.password && this.password === this.hashPassword(password);
};

export let User = mongoose.model<IUser>("User", UserSchema);
