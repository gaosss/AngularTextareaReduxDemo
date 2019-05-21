import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  myMessage: string[];

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.getAllState().subscribe(state => {
      console.log(state);
      this.myMessage = state.users;

    });
  }

}
