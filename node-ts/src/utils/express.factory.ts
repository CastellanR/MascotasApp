"use strict";

import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as expressValidator from "express-validator";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as passport from "passport";
import * as path from "path";
import * as imageModule from "../image/module";
import * as indexModule from "../index/module";
import * as mascotasModule from "../pet/module";
import * as groupModule from "../group/module";
import * as messageModule from "../message/module";
import * as likeModule from "../like/module";
import * as perfilModule from "../profile/module";
import * as provinciasModule from "../provinces/module";
import * as seguridadModule from "../security/module";
import * as passportHandler from "../security/passport";
import * as errorHandler from "../utils/error.handler";
import { Config } from "./environment";



export function init(appConfig: Config): express.Express {
  // Notas de configuración de express http://expressjs.com/es/guide/using-middleware.html#middleware.application
  const app = express();
  app.set("port", appConfig.port);

  // Habilitar Cors
  app.use(cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true
  }));

  // Si estamos en level debug, debaguear los request
  if (appConfig.logLevel == "debug") {
    app.use(morgan("dev"));
  }

  // Configuramos el server para que tome los json correctamente
  app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
  app.use(bodyParser.json({ limit: "5mb" }));

  // Configurar express para comprimir contenidos de text en http
  app.use(compression());

  // Configuramos passport, autentificación por tokens y db
  app.use(passport.initialize());
  app.use(passport.session());

  // Permite hacer validaciones de parámetros req.assert
  app.use(expressValidator());

  // helmet le da seguridad al sistema para prevenir hacks
  app.use(helmet.xssFilter());  // Previene inyección de javascript
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.disable("x-powered-by");

  // Esta es la ruta de contenidos estáticos, no deberían haber muchos pero algo de documentación
  // vendría bien como contenido estático.
  app.use(
    express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
  );

  // Iniciamos nuestros módulos
  passportHandler.init();

  // Iniciamos las rutas del directorio
  // mas sobre rutas http://expressjs.com/es/guide/routing.html
  indexModule.init(app);
  mascotasModule.init(app);
  groupModule.init(app);
  likeModule.init(app);
  messageModule.init(app);
  perfilModule.init(app);
  provinciasModule.init(app);
  seguridadModule.init(app);
  imageModule.init(app);

  // Para el manejo de errores, para que los loguee en la consola
  app.use(errorHandler.logErrors);

  // Responder con JSON cuando hay un error 404, sino responde con un html
  // Esto tiene que ir al final porque sino nos sobreescribe las otras rutas
  app.use(errorHandler.handle404);

  return app;
}
