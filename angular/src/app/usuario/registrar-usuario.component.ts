import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as errorHandler from "../tools/error-handler";
import { IErrorController } from "../tools/error-handler";
import { UsuarioService } from "./usuario.service";


@Component({
  selector: "app-registrar-usuario",
  templateUrl: "./registrar-usuario.component.html"
})
export class RegistrarUsuarioComponent implements OnInit, IErrorController {
  form: FormGroup;
  formSubmitted: boolean;

  errorMessage: string;
  errors: string[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = new FormGroup({
      login: new FormControl("", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])),
      name: new FormControl("", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])),
      password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])),
      password2: new FormControl("", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])),
    }, (formGroup: FormGroup) => {
      return this.validarPasswords(formGroup);
    });
  }

  validarPasswords(group: FormGroup) {
    if (group.controls.password2.dirty && group.controls.password.value !== group.controls.password2.value) {
      this.errors["password2"] = "Los passwords no son iguales";
      return this.errors;
    } else {
      errorHandler.cleanRestValidations(this);
    }
    // tslint:disable-next-line:no-null-keyword
    return null;
  }

  ngOnInit() { }

  submitForm() {
    errorHandler.cleanRestValidations(this);
    if (this.form.valid) {
      this.usuarioService
        .registrarUsuario({
          login: this.form.value.login,
          password: this.form.value.password,
          name: this.form.value.name
        })
        .then(usuario => this.router.navigate(["/"]))
        .catch(error => errorHandler.procesarValidacionesRest(this, error));
    } else {
      this.formSubmitted = true;
    }
  }

  cleanRestValidations() {
    this.errorMessage = undefined;
    this.errors = [];
  }

  procesarValidacionesRest(data: any) {
    if (data.message) {
      for (const error of data.message) {
        this.errors[error.path] = error.message;
      }
    } else {
      this.errorMessage = data.message;
    }
  }
}
