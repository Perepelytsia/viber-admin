import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent }   from './app.component';
import { UsersComponent }   from './components/users.component';
import { NotFoundComponent }   from './components/not-found.componen';
import { ChatComponent }   from './components/chat.component'

// определение маршрутов
const appRoutes: Routes =[
   // { path: '', component: AppComponent},
    { path: 'chat', component: ChatComponent},
    { path: '', component: UsersComponent},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [ AppComponent, NotFoundComponent, UsersComponent, ChatComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
