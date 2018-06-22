import { Component, OnInit } from "@angular/core";
import { Group, GroupService } from "./group.service";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"]
})
export class GroupComponent implements OnInit {
  errorMessage: string;
  groups: Group[];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.groupService
      .buscarGroups()
      .then(groups => (this.groups = groups))
      .catch(error => (this.errorMessage = <any>error));
    console.log(this.groups);
  }

}
