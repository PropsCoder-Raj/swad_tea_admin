import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../_helper/auth/auth.service';
import { UserService } from '../_helper/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  name = '';

  constructor(public title: Title, public authService: AuthService, public userS: UserService) { }

  ngOnInit(): void {
    console.log(this.authService);
    this.getData();
  }

  getData(){
    this.userS.getSingleUser(this.authService.currentUserValue.id).subscribe(response=>{
      this.name = response.data.name;
    })
  }

}
