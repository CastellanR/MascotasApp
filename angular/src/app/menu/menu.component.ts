import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as errorHandler from "../tools/error-handler";
import { IErrorController } from "../tools/error-handler";
import { Usuario, UsuarioService } from "../usuario/usuario.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html"
})
export class MenuComponent implements OnInit, IErrorController {
  loginForm: FormGroup;

  errorMessage: string;
  errors: string[] = [];

  get usuarioLogueado(): Usuario {
    return this.usuarioService.usuarioLogueado;
  }

  constructor(fb: FormBuilder, private router: Router, public usuarioService: UsuarioService) {
    this.loginForm = fb.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required]
    });
  }

  ngOnInit() {
    this.usuarioService.getPrincipal().then();
  }

  login() {
    this.usuarioService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .catch(error => {
        errorHandler.procesarValidacionesRest(this, error);
      });
  }

  logout() {
    errorHandler.cleanRestValidations(this);

    this.usuarioService
      .logout()
      .then(result => {
        this.router.navigate(["/"]);
      })
      .catch(error => {
        errorHandler.procesarValidacionesRest(this, error);
        this.router.navigate(["/"]);
      });
  }
}
