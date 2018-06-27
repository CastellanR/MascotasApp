import { Component, OnInit } from "@angular/core";
import { Message, MessageService } from "./message.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as errorHandler from "../tools/error-handler";
import { IErrorController } from "../tools/error-handler";
import { Usuario, UsuarioService } from "../usuario/usuario.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  messagesSended: Message[] = [];
  messagesReceived: Message[] = [];
  errorMessage: string;
  errors: string[] = [];
  userId: string;
  isDataAvailable: Boolean;

  constructor(
    private messageService: MessageService,
    private userService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.isDataAvailable = false;
    this.userService
      .getPrincipal()
      .then(user => (this.userId = user.id))
      .catch(error => (this.errorMessage = <any>error));
  }

  ngOnInit() {
    this.isDataAvailable = false;
    this.messageService.buscarMessages()
      .then((res) => {
        this.messagesReceived = res.filter(message => message.to === this.userId);
        this.messagesSended = res.filter(message => message.from === this.userId);
        this.isDataAvailable = true;
      })
      .catch(error => {
        errorHandler.procesarValidacionesRest(this, error);
      });
  }

  deleteMessage(id) {
    this.isDataAvailable = false;
    this.messagesReceived = [];
    this.messagesSended = [];
    this.messageService.eliminarMessage(id)
    .then(() => this.ngOnInit())
    .catch(error => errorHandler.procesarValidacionesRest(this, error));
  }
}
