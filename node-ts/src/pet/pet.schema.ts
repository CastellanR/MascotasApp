"use strict";

import * as mongoose from "mongoose";

export interface IPet extends mongoose.Document {
  name: string;
  birthDate: Date;
  description: string;
  user: mongoose.Schema.Types.ObjectId;
  updated: Number;
  created: Number;
  enabled: Boolean;
}

/**
 * Esquema de Mascotas
 */
export let PetSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
    required: "Nombre es requerido"
  },
  birthDate: {
    type: Date,
    default: "",
    trim: true
  },
  description: {
    type: String,
    default: "",
    trim: true
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
}, { collection: "pets" });

/**
 * Antes de guardar
 */
PetSchema.pre("save", function (this: IPet, next) {
  this.updated = Date.now();

  next();
});

export let Pet = mongoose.model<IPet>("Pet", PetSchema);
