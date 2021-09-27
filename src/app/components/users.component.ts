import { Component, OnInit} from '@angular/core';
import {UserModel} from '../models/user.model';
import { HttpService} from '../services/http.service';

@Component({
    selector: 'users-app',
    template:  `<div>{{error}}</div>
    <div class="container">
        <div class="row">
            <div class="col">
            </div>
            <div class="col">
                <ol class="list-group list-group-numbered">
                    <li class="list-group-item d-flex justify-content-between align-items-start" *ngFor="let user of users">
                        <div class="ms-2 me-auto">
                            <a class="link-dark" [routerLink]="['chat']" [queryParams]="{'uid':user.uid}">{{user.name}}</a>
                        </div>
                        <span class="badge bg-primary rounded-pill">{{user.messages}}</span>
                    </li>
                </ol>
            </div>
            <div class="col">
            </div>
        </div>
    </div>
    `,
    providers: [HttpService]
})
export class UsersComponent implements OnInit {

    users: UserModel[]=[];
    error:any;

    constructor(private httpService: HttpService){}

    ngOnInit(){
        this.httpService.getUsers().subscribe(
            (data: UserModel[]) => this.users=data,
            error => {this.error = error.message; console.log(error);}
        );
    }
}