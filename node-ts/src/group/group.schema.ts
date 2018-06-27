"use strict";

import * as mongoose from "mongoose";

export interface IGroup extends mongoose.Document {
  name: string;
  description: string;
  owner: mongoose.Schema.Types.ObjectId;
  owner_name: string;
  users: [mongoose.Schema.Types.ObjectId];
  updated: Number;
  created: Number;
  enabled: Boolean;
}

/**
 * Esquema de Grupo
 */
export let GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
    required: "Nombre es requerido"
  },
  description: {
    type: String,
    default: "",
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  owner_name: {
    type: String,
    default: "",
    trim: true
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
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
}, { collection: "groups" });

/**
 * Antes de guardar
 */
GroupSchema.pre("save", function (this: IGroup, next) {
  this.updated = Date.now();

  next();
});

export let Group = mongoose.model<IGroup>("Group", GroupSchema);
