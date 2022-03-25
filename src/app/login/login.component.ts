import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { first } from 'rxjs/operators';
import { AuthService } from '../_helper/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:any = '';
  password = '';
  loader = false;
  returnUrl = "";
  rememberMe = true;

  constructor(public appC: AppComponent, public router: Router, public toastr: ToastrService, public authS: AuthService) { }

  ngOnInit(): void {
  }

  

  login(){
    this.loader = true;
    if(this.email !== '' && this.password !== ''){
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.email) == false) {
        this.toastr.error("Please! Enter valid email.");
        this.loader = false;
      }else{
        this.authS.userSignIn(this.email, this.password).pipe(first()).subscribe(data => {
          this.loader = false;
          if(this.rememberMe){
            localStorage.removeItem("remember");
            localStorage.removeItem("credential");
            localStorage.setItem("remember","true");
            localStorage.setItem("credential",this.email);
          }        
          window.location.replace(this.returnUrl);
        },
        error => {
          if(error.status == "0"){
            this.toastr.error(error.statusText);
          } else {
            this.toastr.error(error.error.message);
          }
          console.log(error);
          this.loader = false;
        });
      }
    }else{
      this.loader = false;
      this.toastr.error("Please! Enter email & password.");
    }
  }
  

}
