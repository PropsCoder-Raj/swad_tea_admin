import { Component, OnInit } from '@angular/core';
import { AuthService } from './_helper/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Swadchai';
  isLogin = true;
  isActiveWall = false;

  constructor(public authenticationService: AuthService){}

  ngOnInit(): void {
    const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser);
    if (currentUser) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

}
