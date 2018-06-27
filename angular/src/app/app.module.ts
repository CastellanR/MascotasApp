import { APP_BASE_HREF } from "@angular/common";
import { environment } from "../environments/environment";
import { LoggedIn, routing } from "./app.routes";

// Modules
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgDatepickerModule } from "ng2-datepicker";

// Components
import { AppComponent } from "./app.component";
import { MascotaComponent } from "./mascota/mascota.component";
import { NuevaMascotaComponent } from "./mascota/nueva-mascota.component";
import { MenuComponent } from "./menu/menu.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { FileUploadComponent } from "./tools/image.base64";
import { RegistrarUsuarioComponent } from "./usuario/registrar-usuario.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { GroupComponent } from "./group/group.component";
import { NewGroupComponent } from "./group/new-group.component";
import { MessageComponent } from "./message/message.component";

// Service
import { MascotaService } from "./mascota/mascota.service";
import { UsuarioService } from "./usuario/usuario.service";
import { PerfilService } from "./perfil/perfil.service";
import { ProvinciaService } from "./provincia/provincia.service";
import { GroupService } from "./group/group.service";
import { NewMessageComponent } from "./message/new-message.component";
import { MessageService } from "./message/message.service";
import { LikeService } from "./mascota/like.service";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PerfilComponent,
    MascotaComponent,
    MenuComponent,
    NuevaMascotaComponent,
    RegistrarUsuarioComponent,
    FileUploadComponent,
    GroupComponent,
    NewGroupComponent,
    MessageComponent,
    NewMessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgDatepickerModule,
    routing
  ],
  providers: [
    MascotaService,
    MessageService,
    LikeService,
    UsuarioService,
    ProvinciaService,
    PerfilService,
    LoggedIn,
    GroupService,
    /* Los providers son @Inyectable, la siguiente es una forma de definir un
     provider con un valor constante para poder inyectarlo*/
    { provide: APP_BASE_HREF, useValue: environment.baseHref }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
