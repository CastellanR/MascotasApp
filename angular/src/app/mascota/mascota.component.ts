import { Component, OnInit } from "@angular/core";
import * as errorHandler from "../tools/error-handler";
import { IErrorController } from "../tools/error-handler";
import { Mascota, MascotaService } from "./mascota.service";
import { LikeService, Like } from "./like.service";
import { UsuarioService } from "../usuario/usuario.service";
import { Perfil, PerfilService } from "../perfil/perfil.service";

@Component({
  selector: "app-mascota",
  templateUrl: "./mascota.component.html",
  styleUrls: ["./mascota.component.css"],
})
export class MascotaComponent implements OnInit {
  errorMessage: string;
  errors: string[] = [];
  mascota: Object;
  mascotas: any[];
  profiles: Perfil[];
  like: Like;
  likes = [];
  userId: string;
  isDataAvailable: Boolean;
  constructor(
    private mascotasService: MascotaService,
    private profileService: PerfilService,
    private usuarioService: UsuarioService,
    private likeService: LikeService,
  ) {
    this.isDataAvailable = false;
    this.like = {
      _id: undefined,
      from: undefined,
      to: undefined,
    };
  }

  ngOnInit() {
    this.likes = [];
    this.profiles = [];
    this.usuarioService
      .getPrincipal()
      .then(user => (this.userId = user.id))
      .catch(error => (this.errorMessage = <any>error));
    this.mascotasService
      .buscarMascotas()
      .then(mascotas => {
        this.mascotas = mascotas;
        mascotas.forEach(mascota => {
          this.mascota = mascota;
          this.likeService
            .buscarLikes(mascota._id)
            .then(likes => {
              this.likes.push(likes);
            })
            .catch(error => (this.errorMessage = <any>error));
        });
        this.profileService
        .buscarPerfiles()
        .then(profiles => {
          this.profiles = profiles;
          this.isDataAvailable = true;
        });
      })
      .catch(error => (this.errorMessage = <any>error));
  }

  getQuantity(index) {
    if (this.likes[index] === undefined) return 0;
    else {
      return this.likes[index].length;
    }
  }

  getName(index) {
    return this.likes[index].find( like => like.from === this.userId );
  }

  getOwner(id) {
    if (id === undefined) return "";
    return this.profiles.filter( profile => profile.user === id)[0].name;
  }

  manageLike(id) {
    this.isDataAvailable = false;
    this.likeService
      .buscarLikes(id)
      .then(likes => {
        if (likes.find( like => like.from === this.userId )) {
          const value = likes.filter(like => like.from === this.userId);
          this.likeService
          .eliminarLike(value[0]._id)
          .then(() => {
            this.ngOnInit();
          })
          .catch(error => errorHandler.procesarValidacionesRest(this, error));
        }
        else {
          this.like.from = this.userId;
          this.like.to = id;
          this.likeService
            .guardarLike(this.like)
            .then(() => {
              this.ngOnInit();
            })
            .catch(error => errorHandler.procesarValidacionesRest(this, error));
        }

      })
      .catch(error => {
        errorHandler.procesarValidacionesRest(this, error);
      });
  }
}
