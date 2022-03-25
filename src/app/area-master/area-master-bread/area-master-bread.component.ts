import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "../location";
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';

@Component({
  selector: 'app-area-master-bread',
  templateUrl: './area-master-bread.component.html',
  styleUrls: ['./area-master-bread.component.scss']
})
export class AreaMasterBreadComponent implements OnInit {
  breadStatus = true;
  edit = false;
  myLocation : any = new Location();
  districtsList : Array<any> = [];
  cityList : Array<any> = [];
  editId = '';

  _state = '';
  _city = '';
  _district = '';
  _name = '';
  _prospectSale = '';
  _status = '';

  constructor(public route: ActivatedRoute, public title: Title, public toastr: ToastrService, public router: Router, public apiS: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: any)=>{
      if(data.action == "create"){
        this.edit = false;
        this.title.setTitle("Create Area | Swadchai");
      }else{
        this.edit = true;
        this.title.setTitle("Update Area | Swadchai");
        this.route.queryParams.subscribe((params: any) =>{
          this.editId = params.id;
          this.apiS.getSingleAreaMaster(this.editId).subscribe((response: any) => {
            this._state = response.data[0].state;
            this._city = response.data[0].city;
            this._district = response.data[0].district;
            this._name = response.data[0].areaName;
            this._prospectSale = response.data[0].prospectSale;
            this._status = response.data[0].status;
          });
        })
      }  
    });
  }

  onchange(){
    this._city = this._district;
  }

  submit(){
    if(this._name === null || this._name === '' || this._name === undefined){
      this.toastr.error("Please Enter Area Name");
      return;
    }

    if(this._state === null || this._state === '' || this._state === undefined){
      this.toastr.error("Please Select State");
      return;
    }

    if(this._district === null || this._district === '' || this._district === undefined){
      this.toastr.error("Please Select District");
      return;
    }

    if(this._city === null || this._city === '' || this._city === undefined){
      this.toastr.error("Please Select City");
      return;
    }

    if(this._prospectSale === null || this._prospectSale === '' || this._prospectSale === undefined){
      this.toastr.error("Please Enter Prospect Sale");
      return;
    }

    if(this._status === null || this._status === '' || this._status === undefined){
      this.toastr.error("Please Select Status");
      return;
    }

    if(this.edit != false){
      this.apiS.updateAreaMaster(this._name, this._state, this._district, this._city, this._prospectSale, this._status, this.editId).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/area-master/list']);
        }
      })
    }else{
      this.apiS.createAreaMaster(this._name, this._state, this._district, this._city, this._prospectSale, this._status).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/area-master/list']);
        }
      })
    }
  }

}
