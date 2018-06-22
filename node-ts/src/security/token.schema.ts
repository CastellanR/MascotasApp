"use strict";

import * as mongoose from "mongoose";

/*
Son tokens de sesión se guardan en la base de datos.
Para deshabilitar un token hay que poner valida=false
*/

export interface IToken extends mongoose.Document {
  valid: boolean;
  usuario: mongoose.Schema.Types.ObjectId;
}

export let TokenSchema = new mongoose.Schema({
  valid: {
    type: Boolean,
    default: true,
    required: "Valid es requerido"
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Usuario es requerido"
  }
}, {collection: "tokens"});

export let Token = mongoose.model<IToken>("Token", TokenSchema);