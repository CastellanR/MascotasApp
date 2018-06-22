"use strict";

import * as mongoose from "mongoose";

export interface IProfile extends mongoose.Document {
  name: string;
  phone: string;
  email: string;
  address: string;
  picture: string;
  valid: Boolean;
  province: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  updated: Number;
  created: Number;
  enabled: Boolean;
}
/**
 * Esquema del Perfil
 */
export let ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
    required: "Nombre es requerido"
  },
  phone: {
    type: String,
    default: "",
    trim: true
  },
  email: {
    type: String,
    default: "",
    trim: true,
    required: "Email es requerido"
  },
  address: {
    type: String,
    default: "",
    trim: true
  },
  picture: {
    type: String,
    ref: "Image"
  },
  valid: {
    type: Boolean,
    default: true
  },
  province: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Province"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Usuario es requerido"
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
}, { collection: "profiles" });


/**
 * Antes de guardar
 */
ProfileSchema.pre("save", function (this: IProfile, next) {
  this.updated = Date.now();

  next();
});

export let Profile = mongoose.model<IProfile>("Profile", ProfileSchema);
