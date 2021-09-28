import { Component, OnInit} from '@angular/core';
import {UserModel} from '../../models/user.model';
import { HttpService} from '../../services/http.service';

@Component({
    selector: 'users-app',
    templateUrl: "./users.component.html",
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