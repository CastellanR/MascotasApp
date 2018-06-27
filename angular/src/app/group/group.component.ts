import { Component, OnInit } from "@angular/core";
import { Group, GroupService } from "./group.service";
import * as errorHandler from "../tools/error-handler";
import { IErrorController } from "../tools/error-handler";
import { Usuario, UsuarioService } from "../usuario/usuario.service";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"]
})
export class GroupComponent implements OnInit, IErrorController {
  errorMessage: string;
  groups: Group[];
  errors: string[] = [];
  group: Group;
  userId: string;

  constructor(private groupService: GroupService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService
      .getPrincipal()
      .then(user => (this.userId = user.id))
      .catch(error => (this.errorMessage = <any>error));
    this.groupService
      .buscarGroups()
      .then(groups => (this.groups = groups))
      .catch(error => (this.errorMessage = <any>error));
  }

  isMember(users) {
   return users.find( user => user == this.userId );
  }

  manageMembership(id) {
    this.groupService
      .buscarGroup(id)
      .then(group => {
        this.group = group;
        if (this.isMember(this.group.users)) {
            this.group.users = this.group.users.filter(user => user != this.userId);
        }
        else {
          this.group.users.push(this.userId);
        }
        this.groupService
        .guardarGroup(this.group)
        .then(() => this.ngOnInit())
        .catch(error => errorHandler.procesarValidacionesRest(this, error));
      })
      .catch(error => {
        errorHandler.procesarValidacionesRest(this, error);
      });
  }
}
