import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {ChatModel} from '../models/chat.model';
import {Observable, throwError} from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable()
export class HttpService{

    constructor(private http: HttpClient){ }

    getUsers() : Observable<UserModel[]> {
        return this.http.get('https://lego-viber-bot.herokuapp.com/api/users').pipe(
            map((data:any)=>{
                let usersList = data;
                return usersList.map(function(user: any): UserModel {
                    return new UserModel(user.name, encodeURI(user.uid), user.messages);
                });
            }),
            catchError(err => {
                console.log(err);
                return throwError(err);
            })
        );
    }

    getChat(uid:string) : Observable<ChatModel> {
        return this.http.get('https://lego-viber-bot.herokuapp.com/api/chat?uid='+uid).pipe(
            map((data:any)=>{ return data;}),
            catchError(err => {
                console.log(err);
                return throwError(err);
            })
        );
    }
}