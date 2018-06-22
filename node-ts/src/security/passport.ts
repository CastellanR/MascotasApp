"use strict";

import * as jwt from "jsonwebtoken";
import * as nodeCache from "node-cache";
import * as passport from "passport";
import * as passportJwt from "passport-jwt";
import * as appConfig from "../utils/environment";
import { IUserSession } from "./security.service";
import { IToken, Token } from "./token.schema";
import { IUser } from "./user.schema";


// Este cache de sesiones en memoria va a evitar que tenga que ir a la base de datos
// para verificar que la sesión sea valida. 1 hora de cache en memoria. Luego se vuelve a leer de la db
const sessionCache = new nodeCache({ stdTTL: 3600, checkperiod: 60 });
const conf = appConfig.getConfig(process.env);


/**
 * @apiDefine AuthHeader
 *
 * @apiExample {String} Autorización
 *    Authorization=bearer {token}
 *
 * @apiErrorExample {json} 401 Unauthorized
 *    HTTP/1.1 401 Unauthorized Method
 */
export function init() {
    const Strategy = passportJwt.Strategy;
    const ExtractJwt = passportJwt.ExtractJwt;

    const params = {
        secretOrKey: conf.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };

    /*
    Este método se utiliza para validar que el usuario se haya logueado.
    passport.authenticate("jwt", { session: false })  termina llamando a este método.
    El resultado de este método es puesto en el request, o sea el payload se pone en el request

    A esta altura el token fue desencriptado correctamente, pero hay que validar el contenido.
    */
    passport.use(new Strategy(params, function (payload: IUserSession, done) {
        /*
        La estrategia es tener un listado de Token validos en la db y validar contra eso.
        Podemos invalidar un token desde la db, usando Token.valid.

        Pero para no esta leyendo permanentemente en la db, usamos un cacheLocal que nos
        mantiene 1 hora los tokens en memoria, luego de esa hora se vuelven a leer desde la db.
        */
        const cachedSession = sessionCache.get(payload.token_id);
        if (cachedSession && cachedSession === payload.id) {
            return done(undefined, payload);
        } else {
            Token.findById(payload.token_id, function (err: any, token: IToken) {
                if (err || !token || !token.valid || !(token.usuario as any).equals(payload.id)) {
                    return done(undefined, false, {
                        message: "Invalid Token"
                    });
                }
                sessionCache.set(token.id, token.usuario.toString());
                return done(undefined, payload);
            });
        }
    }));
}

/**
 * Invalida la sesion en passport. Basciamente limpia el cache
 */
export function invalidateSessionToken(token: IUserSession) {
    sessionCache.del(token.token_id);
}

/**
 * Crea un token lo pone en el cache, lo encripta y lo devuelve.
 */
export function createToken(user: IUser, sessionToken: IToken): string {
    const payload: IUserSession = { id: user.id, _id: user._id, token_id: sessionToken.id };
    const token = jwt.sign(payload, conf.jwtSecret);
    sessionCache.set(sessionToken.id, sessionToken.usuario.toString());

    return token;
}
