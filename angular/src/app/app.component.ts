import { Component } from "@angular/core";
import { Usuario, UsuarioService } from "./usuario/usuario.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  title = "Mascotas";

  constructor(public usuarioService: UsuarioService) {
  }

  get usuarioLogueado(): Usuario {
    return this.usuarioService.usuarioLogueado;
  }
}
