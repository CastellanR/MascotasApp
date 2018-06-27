import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { RestBaseService } from "../tools/rest.tools";

@Injectable()
export class LikeService extends RestBaseService {
  private likes = "/likes";
  private like = "/like";

  constructor(private http: Http) {
    super();
  }

  buscarLikes(id: string): Promise<Like[]> {
    return this.http
      .get(LikeService.serverUrl + this.likes + "/" + id, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Like[];
      })
      .catch(this.handleError);
  }

  guardarLike(value: Like): Promise<Like> {
    return this.http
      .post(
        LikeService.serverUrl + this.like,
        JSON.stringify(value),
        this.getRestHeader()
      )
      .toPromise()
      .then(response => {
        return response.json() as Like;
      })
      .catch(this.handleError);
  }

  eliminarLike(id: string): Promise<any> {
    if (id) {
      return this.http
        .delete(
          LikeService.serverUrl + this.like + "/" + id,
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

export interface Like {
  _id: string;
  from: string;
  to: string;
}
