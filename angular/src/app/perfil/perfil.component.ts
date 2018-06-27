import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Provincia, ProvinciaService } from "../provincia/provincia.service";
import * as errorHandler from "../tools/error-handler";
import { IErrorController } from "../tools/error-handler";
import { Image, Perfil, PerfilService } from "./perfil.service";


@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html"
})
export class PerfilComponent implements OnInit, IErrorController {
  formSubmitted: boolean;

  errorMessage: string;
  errors: string[] = [];

  provincias: Provincia[];
  perfil: Perfil;
  imagenPerfil: Image;
  imagen: Image;

  constructor(
    private provinciaService: ProvinciaService,
    private perfilService: PerfilService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.perfil = {
      _id: undefined,
      name: "",
      email: "",
      province: "",
      address: "",
      picture: "",
      phone: "",
      user: "",
    };
    this.imagen = {
      image: ""
    };
    this.imagenPerfil = {
      image: "/assets/loading.gif"
    };
  }

  actualizarImagen(imagen: any) {
    this.perfil.picture = undefined;
    this.imagenPerfil.image = imagen;
    this.imagen.image = imagen;
  }

  ngOnInit() {
    this.provinciaService
      .getProvincias()
      .then(provincias => (this.provincias = provincias))
      .catch(error => errorHandler.procesarValidacionesRest(this, error));

    this.perfilService
      .buscarPerfil()
      .then(perfil => {
        this.perfil = perfil;
        if (this.perfil.picture) {
          this.perfilService
            .buscarImagen(this.perfil.picture)
            .then(imagen => {
              this.imagenPerfil = imagen;
            }).catch(error => this.imagenPerfil.image = "/assets/profile.png");
        } else {
          this.imagenPerfil.image = "/assets/profile.png";
        }
      })
      .catch(error => {
        errorHandler.procesarValidacionesRest(this, error);
        this.imagenPerfil.image = "/assets/profile.png";
      });
  }

  submitForm() {
    errorHandler.cleanRestValidations(this);

    if (this.imagen.image && !this.perfil.picture) {
      this.perfilService
        .guardarImagen(this.imagen)
        .then(image => {
          this.perfil.picture = image.id;
          this.perfilService
            .guardarPerfil(this.perfil)
            .then(usuario => this.router.navigate(["/"]))
            .catch(error => errorHandler.procesarValidacionesRest(this, error));
        })
        .catch(error => errorHandler.procesarValidacionesRest(this, error));
    } else {
      this.perfilService
        .guardarPerfil(this.perfil)
        .then(usuario => this.router.navigate(["/"]))
        .catch(error => errorHandler.procesarValidacionesRest(this, error));
    }
  }
}
