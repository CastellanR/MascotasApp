import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { RestBaseService } from "../tools/rest.tools";

@Injectable()
export class ProvinciaService extends RestBaseService {
  private provinciasUrl = "/province";

  constructor(private http: Http) {
    super();
  }

  getProvincias(): Promise<Provincia[]> {
    return this.http
      .get(
        ProvinciaService.serverUrl + this.provinciasUrl,
        this.getRestHeader()
      )
      .toPromise()
      .then(response => {
        return response.json() as Provincia[];
      })
      .catch(this.handleError);
  }
}

export interface Provincia {
  _id: string;
  name: string;
}
