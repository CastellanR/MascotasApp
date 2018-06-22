import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as esLocale from "date-fns/locale/es";
import * as errorHandler from "../tools/error-handler";
import { IErrorController } from "../tools/error-handler";
import { Group, GroupService } from "./group.service";

@Component({
  selector: "app-new-group",
  templateUrl: "./new-group.component.html",
  styleUrls: ["./new-group.component.css"]
})
export class NewGroupComponent implements OnInit, IErrorController {

  group: Group;
  arLocale = esLocale;
  formSubmitted: boolean;

  errorMessage: string;
  errors: string[] = [];

  constructor(
    private groupsService: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.group = {
      _id: undefined,
      name: "",
      description: "",
      owner: "",
      users: [""],
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params["id"];
      if (id) {
        this.groupsService
          .buscarGroup(id)
          .then(group => {
            this.group = group;
          })
          .catch(error => {
            errorHandler.procesarValidacionesRest(this, error);
          });
      }
    });
  }

  submitForm() {
    errorHandler.cleanRestValidations(this);
    this.groupsService
      .guardarGroup(this.group)
      .then(group => this.router.navigate(["/grupos"]))
      .catch(error => errorHandler.procesarValidacionesRest(this, error));
  }

  onDelete() {
    errorHandler.cleanRestValidations(this);
    this.groupsService
      .eliminarGroup(this.group._id)
      .then(any => this.router.navigate(["/grupos"]))
      .catch(error => errorHandler.procesarValidacionesRest(this, error));
  }

}
