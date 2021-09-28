import {Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {formatDate} from '@angular/common';
import {Subscription} from 'rxjs';
import {HttpService} from "../../services/http.service";
import {ChatModel} from '../../models/chat.model';
import {MessageModel} from '../../models/message.model';

@Component({
    selector: 'chat-app',
    templateUrl: "./chat.component.html",
    styleUrls: ["./chat.component.css"],
    providers: [HttpService]
})
export class ChatComponent implements OnInit {

    uid: any;
    messages: MessageModel[];
    error:any;
    private querySubscription: Subscription;

    constructor(private activateRoute: ActivatedRoute, private httpService: HttpService) {
        this.querySubscription = activateRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.uid = queryParam['uid'];
            }
        );
    }

    ngOnInit(){
        this.httpService.getChat(this.uid).subscribe(
            (data: ChatModel) => {
                let unsortedMsg = []

                for (let msg of data.questions) {
                    let at = new Date(msg.day + ', ' + msg.at)
                    unsortedMsg.push(new MessageModel(true, at, formatDate(at,'yy-mm-dd hh:mm:ss','en-US'), msg.name, msg.data))
                }

                for (let msg of data.answers) {
                    let at = new Date(msg.day + ', ' + msg.at)
                    unsortedMsg.push(new MessageModel(false, at, formatDate(at,'yy-mm-dd hh:mm:ss','en-US'), 'Bot', msg.data))
                }

                this.messages = unsortedMsg.sort((obj1, obj2) => {
                    if (obj1.at > obj2.at) {
                        return -1;
                    }
                    if (obj1.at < obj2.at) {
                        return 1;
                    }
                    return 0;
                });
            },
            error => {this.error = error.message; console.log(error);}
        );
    }

}