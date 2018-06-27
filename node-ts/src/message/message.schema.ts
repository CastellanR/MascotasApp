"use strict";

import * as mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
  content: string;
  from: mongoose.Schema.Types.ObjectId;
  from_user: string;
  to: mongoose.Schema.Types.ObjectId;
  to_user: string;
  created: Number;
  enabled: Boolean;
}

/**
 * Esquema de Mensaje
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
  from_user: {
    type: String,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "To",
  },
  to_user: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "messages" });

/**
 * Antes de guardar
 */
MessageSchema.pre("save", function (this: IMessage, next) {
  next();
});

export let Message = mongoose.model<IMessage>("Message", MessageSchema);
