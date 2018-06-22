import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { RestBaseService } from "../tools/rest.tools";

@Injectable()
export class GroupService extends RestBaseService {
  private url = "/group";

  constructor(private http: Http) {
    super();
  }

  buscarGroups(): Promise<Group[]> {
    return this.http
      .get(GroupService.serverUrl + this.url, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Group[];
      })
      .catch(this.handleError);
  }

  buscarGroup(id: number): Promise<Group> {
    return this.http
      .get(GroupService.serverUrl + this.url + "/" + id, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Group;
      })
      .catch(this.handleError);
  }

  guardarGroup(value: Group): Promise<Group> {
    if (value._id) {
      return this.http
        .put(
          GroupService.serverUrl + this.url + "/" + value._id,
          JSON.stringify(value),
          this.getRestHeader()
        )
        .toPromise()
        .then(response => {
          return response.json() as Group;
        })
        .catch(this.handleError);
    } else {
      return this.http
        .post(
          GroupService.serverUrl + this.url,
          JSON.stringify(value),
          this.getRestHeader()
        )
        .toPromise()
        .then(response => {
          return response.json() as Group;
        })
        .catch(this.handleError);
    }
  }

  eliminarGroup(id: string): Promise<any> {
    if (id) {
      return this.http
        .delete(
          GroupService.serverUrl + this.url + "/" + id,
          this.getRestHeader()
        )
        .toPromise()
        .then(response => {
          return "";
        })
        .catch(this.handleError);
    }
  }
}

export interface Group {
  _id: string;
  name: string;
  description: string;
  owner: string;
  users: [string];
}
