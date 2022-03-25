import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_helper/api/api.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  data:any =[];
  totalEmp=0;
  newEnroll=0;
  totalRetials=0;
  currentLang = "";
  constructor(public authS: AuthService, public apiS: ApiService) { }
  
  ngOnInit(): void {
    this.getData();
    this.currentLang = "English";
  }

  getData(){
    this.apiS.getAllEmployeeMaster().subscribe(data => {
      this.totalEmp = data.data.length;
    })
    this.apiS.getAllRetailerMaster().subscribe(data => {
      this.totalRetials = data.data.length;
    })
  }

  clearNotification(){
  }
  changeLanguage(value:any){
  }
  change(){
    $("#header").hide();
    $("#menu").hide();
    $("#footer").hide();
    $("#help").hide();
  }
  

}
