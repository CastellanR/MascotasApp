import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { RestBaseService } from "../tools/rest.tools";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable()
export class PerfilService extends RestBaseService {
  private perfilUrl = "/profile";
  private imagenUrl = "/image";
  private perfiles = "/profile/all";

  constructor(private http: Http, private securityService: UsuarioService) {
    super();
  }

  buscarPerfil(): Promise<Perfil> {
    return this.http
      .get(PerfilService.serverUrl + this.perfilUrl, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Perfil;
      })
      .catch(this.handleError);
  }

  buscarPerfiles(): Promise<Perfil[]> {
    return this.http
      .get(PerfilService.serverUrl + this.perfiles, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Perfil[];
      })
      .catch(this.handleError);
  }

  buscarImagen(id: string): Promise<Image> {
    return this.http
      .get(PerfilService.serverUrl + this.imagenUrl + "/" + id, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Image;
      })
      .catch(this.handleError);
  }


  guardarImagen(value: Image): Promise<Image> {
    return this.http
      .post(
        PerfilService.serverUrl + this.imagenUrl,
        JSON.stringify(value),
        this.getRestHeader()
      )
      .toPromise()
      .then(response => {
        return response.json() as Image;
      })
      .catch(this.handleError);
  }

  guardarPerfil(value: Perfil): Promise<Perfil> {
    return this.http
      .put(
        PerfilService.serverUrl + this.perfilUrl,
        JSON.stringify(value),
        this.getRestHeader()
      )
      .toPromise()
      .then(response => {
        this.securityService.getPrincipal().then();
        return response.json() as Perfil;
      })
      .catch(this.handleError);
  }
}
"use strict";
export interface Perfil {
  _id: string;
  name: string;
  province: string;
  email: string;
  address: string;
  phone: string;
  picture: string;
  user: string;
}

export interface Image {
  id?: string;
  image: string;
}
