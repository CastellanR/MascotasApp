"use strict";

import * as dotenv from "dotenv";

let config: Config;

/*
Todas las configuraciones del servidor se encuentran en este modulo, si se quien
acceder desde cualquier parte del sistema, se deben acceder llamando a este metodo.
*/
export function getConfig(environment: any): Config {
  if (!config) {
    // El archivo .env es un archivo que si esta presente se leen las propiedades
    // desde ese archivo, sino se toman estas de aca para entorno dev.
    // .env es un archivo que no se debería subir al repo y cada server debería tener el suyo
    dotenv.config({ path: ".env" });

    config = {
      port: process.env.SERVER_PORT || "3000",
      logLevel: process.env.LOG_LEVEL || "debug",
      mongoDb: process.env.MONGODB || "mongodb://localhost/petdb",
      redisHost: process.env.REDIS_HOST || "127.0.0.1",
      redisPort: Number(process.env.REDIS_PORT || "6379"),
      jwtSecret: process.env.JWT_SECRET || "+b59WQF+kUDr0TGxevzpRV3ixMvyIQuD1O",
      passwordSalt: process.env.PASSWORD_SALT || "DP3whK1fL7kKvhWm6pZomM/y8tZ92mkEBtj29A4M+b8"
    };
  }
  return config;
}

export interface Config {
  port: string;
  logLevel: string; // 'debug' | 'verbose' | 'info' | 'warn' | 'error';
  mongoDb: string;
  redisHost: string;
  redisPort: number;
  passwordSalt: string;
  jwtSecret: string;
}
