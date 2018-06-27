import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { RestBaseService } from "../tools/rest.tools";

@Injectable()
export class MessageService extends RestBaseService {
  private url = "/message";

  constructor(private http: Http) {
    super();
  }

  buscarMessages(): Promise<Message[]> {
    return this.http
      .get(MessageService.serverUrl + this.url, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Message[];
      })
      .catch(this.handleError);
  }

  guardarMessage(value: Message): Promise<Message> {
    return this.http
      .post(
        MessageService.serverUrl + this.url,
        JSON.stringify(value),
        this.getRestHeader()
      )
      .toPromise()
      .then(response => {
        return response.json() as Message;
      })
      .catch(this.handleError);
  }

  eliminarMessage(id: string): Promise<any> {
    if (id) {
      return this.http
        .delete(
          MessageService.serverUrl + this.url + "/" + id,
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

export interface Message {
  content: string;
  from: string;
  from_user: string;
  to: string;
  to_user: string;
  created: Number;
  enabled: Boolean;
}
