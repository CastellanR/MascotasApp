import { Headers, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";

export class RestBaseService {
  public static serverUrl = environment.serverBase;

  protected handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || "";
      return Promise.reject(body);
    } else {
      errMsg = error.message ? error.message : error.toString();
      return Promise.reject(errMsg);
    }
  }

  protected getRestHeader(): RequestOptions {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem("auth_token")
    });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return options;
  }
}
