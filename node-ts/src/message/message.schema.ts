"use strict";

import * as mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
  content: string;
  from: mongoose.Schema.Types.ObjectId;
  to: mongoose.Schema.Types.ObjectId;
  created: Number;
}

/**
 * Esquema de Mascotas
 */
export let MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    default: "",
    trim: true
  },
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
}, { collection: "messages" });

/**
 * Antes de guardar
 */
MessageSchema.pre("save", function (this: IMessage, next) {
  next();
});

export let Message = mongoose.model<IMessage>("Message", MessageSchema);
