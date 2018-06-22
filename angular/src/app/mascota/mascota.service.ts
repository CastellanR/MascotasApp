import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { RestBaseService } from "../tools/rest.tools";

@Injectable()
export class MascotaService extends RestBaseService {
  private url = "/pet";

  constructor(private http: Http) {
    super();
  }

  buscarMascotas(): Promise<Mascota[]> {
    return this.http
      .get(MascotaService.serverUrl + this.url, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Mascota[];
      })
      .catch(this.handleError);
  }

  buscarMascota(id: number): Promise<Mascota> {
    return this.http
      .get(MascotaService.serverUrl + this.url + "/" + id, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Mascota;
      })
      .catch(this.handleError);
  }

  guardarMascota(value: Mascota): Promise<Mascota> {
    if (value._id) {
      return this.http
        .put(
          MascotaService.serverUrl + this.url + "/" + value._id,
          JSON.stringify(value),
          this.getRestHeader()
        )
        .toPromise()
        .then(response => {
          return response.json() as Mascota;
        })
        .catch(this.handleError);
    } else {
      return this.http
        .post(
          MascotaService.serverUrl + this.url,
          JSON.stringify(value),
          this.getRestHeader()
        )
        .toPromise()
        .then(response => {
          return response.json() as Mascota;
        })
        .catch(this.handleError);
    }
  }

  eliminarMascota(id: string): Promise<any> {
    if (id) {
      return this.http
        .delete(
          MascotaService.serverUrl + this.url + "/" + id,
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

export interface Mascota {
  _id: string;
  name: string;
  birthDate: string;
  description: string;
}
