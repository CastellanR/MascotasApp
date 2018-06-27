"use strict";

import * as mongoose from "mongoose";

export interface ILike extends mongoose.Document {
  from: mongoose.Schema.Types.ObjectId;
  to: mongoose.Schema.Types.ObjectId;
  created: Number;
  enabled: Boolean;
}

/**
 * Esquema de Like
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
  enabled: {
    type: Boolean,
    default: true,
  }
}, { collection: "likes" });

/**
 * Antes de guardar
 */
LikeSchema.pre("save", function (this: ILike, next) {
  next();
});

export let Like = mongoose.model<ILike>("Like", LikeSchema);
