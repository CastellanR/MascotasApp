import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as esLocale from "date-fns/locale/es";
import * as errorHandler from "../tools/error-handler";
import { IErrorController } from "../tools/error-handler";
import { Message, MessageService } from "./message.service";
import { Perfil, PerfilService } from "../perfil/perfil.service";
import { UsuarioService } from "../usuario/usuario.service";

@Component({
  selector: "app-new-message",
  templateUrl: "./new-message.component.html",
  styleUrls: ["./new-message.component.css"]
})
export class NewMessageComponent implements OnInit, IErrorController {

  message: Message;
  arLocale = esLocale;
  formSubmitted: boolean;
  profiles: Perfil[];
  profileId: string;
  errorMessage: string;
  errors: string[] = [];

  constructor(
    private messageService: MessageService,
    private profileService: PerfilService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.message = {
      content: "",
      from: "",
      from_user: "",
      to: "",
      to_user: "",
      created: undefined,
      enabled: true,
    };
  }

  ngOnInit() {
    this.profileService
      .buscarPerfiles()
      .then(profiles => {
        this.profiles = profiles;
      })
      .catch(error => (this.errorMessage = <any>error));
    this.usuarioService
      .getPrincipal()
      .then(user => (this.message.from_user = user.name))
      .catch(error => (this.errorMessage = <any>error));
  }

  submitForm() {
    console.log(this.profileId);
    this.message.to = this.profileId;
    const profile = this.profiles.find(profile => profile.user == this.profileId);
    this.message.to_user = profile.name;
    errorHandler.cleanRestValidations(this);
    this.messageService
      .guardarMessage(this.message)
      .then(message => this.router.navigate(["/mensajes"]))
      .catch(error => errorHandler.procesarValidacionesRest(this, error));
  }
}
