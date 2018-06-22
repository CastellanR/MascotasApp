"use strict";

import * as mongoose from "mongoose";

export interface ILike extends mongoose.Document {
  from: mongoose.Schema.Types.ObjectId;
  to: mongoose.Schema.Types.ObjectId;
  created: Number;
}

/**
 * Esquema de Mascotas
 */
export let LikeSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
  },
  created: {
    type: Date,
    default: Date.now()
  },
}, { collection: "likes" });

/**
 * Antes de guardar
 */
LikeSchema.pre("save", function (this: ILike, next) {
  next();
});

export let Like = mongoose.model<ILike>("Like", LikeSchema);
