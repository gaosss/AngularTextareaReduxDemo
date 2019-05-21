import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from "@angular/forms";
import {reducers} from "./store/reducers";
import {UserService} from "./user.service";
import { SanatizeHtmlPipe } from './sanatize-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    SanatizeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
