import {Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpService} from "../services/http.service";
import {ChatModel} from '../models/chat.model';
import {QuestionModel} from '../models/question.model';

@Component({
    selector: 'chat-app',
    template: `
        <h3>Chat</h3>
        <div>Uid: {{uid}}</div>
        <ul>
            <li *ngFor="let question of questions">
                <span>{{question.data}}</span>
            </li>
        </ul>
    `,
    providers: [HttpService]
})
export class ChatComponent implements OnInit {

    uid: any;
    questions: QuestionModel[];
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
                this.questions = data.questions
            },
            error => {this.error = error.message; console.log(error);}
        );
    }

}