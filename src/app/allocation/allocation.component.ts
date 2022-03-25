import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../_helper/api/api.service';
import { UserService } from '../_helper/user/user.service';

@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.scss']
})
export class AllocationComponent implements OnInit {

  employeeList: Array<any> = [];
  areaMasterListAllocated: Array<any> = [];
  areaMasterListBlackout: Array<any> = [];
  
  allocatedArea: Array<any> = [];
  blackoutArea: Array<any> = [];

  searchText1 = '';
  searchText2 = '';
  searchText3 = '';

  constructor(public apiS: ApiService, public userS: UserService, public toastr: ToastrService, public title: Title) {
    this.title.setTitle("Allocation | Swadchai");
  }

  ngOnInit(): void {
    this.getData();
  }

  clear(){
    this.employeeList = [];
    this.areaMasterListAllocated = [];
    this.areaMasterListBlackout = [];
    this.allocatedArea = [];
    this.blackoutArea = [];

    this.searchText1 = '';
    this.searchText2 = '';
    this.searchText3 = '';
  }

  assing(){
    this.allocatedArea = [];
    this.blackoutArea = [];

    let empEount = 0;
    let actionCount = 0;

    this.employeeList.forEach(element=>{
      if(element.checked === true) {
        empEount++;
      }
    });    

    this.areaMasterListAllocated.forEach(element=>{
      if(element.checked === true) {
        this.allocatedArea.push(element.name);
        actionCount++;
      }
    });
    
    this.areaMasterListBlackout.forEach(element=>{
      if(element.checked === true) {
        this.blackoutArea.push(element.name);
        actionCount++;
      }
    });

    if(empEount === 0){
      this.toastr.error("Please Select Employee");
      return;
    }

    if(this.allocatedArea.length === 0 && this.blackoutArea.length === 0){
      this.toastr.error("Please Select Allocated Area OR Blackout Area");
      return;
    }

    let myPromise = new Promise((resolve, reject) =>{
      this.employeeList.forEach(element=>{
        if(element.checked === true) {
          if(this.allocatedArea.length > 0){
            this.apiS.updateEmployeeMasterAlloatedArea(this.allocatedArea, element['empId']).subscribe(response =>{
            });
          }
          if(this.blackoutArea.length > 0){
            this.apiS.updateEmployeeMasterBlackoutArea(this.blackoutArea, element['empId']).subscribe(response =>{
            });
          }
        }

        let interval = setInterval(() => {
          if(actionCount === 0){
            clearInterval(interval); 
            this.toastr.success("Employee Update Successfully");
            setTimeout(() => {
              this.clear();
              this.getData();
              window.scrollTo(0, 0);
            }, 1000);
          }
          actionCount--;
        });
      });
    });
  }

  getData(): any{
    
    this.apiS.getAllAreaMaster().subscribe(data=>{
      data.data.forEach((element: any)=>{
        this.areaMasterListAllocated.push({name: element.areaName, checked : false, status: element.status,});
        this.areaMasterListBlackout.push({name: element.areaName, checked : false, status: element.status,});
      })
    });
    this.apiS.getAllEmployeeMaster().subscribe(data=>{
      let myPromise = new Promise<any>((resolve: any, reject: any) =>{
        data.data.forEach((element: any, index: any, array: any)=>{
          this.userS.getSingleUser(element.user).subscribe(response=>{
            this.apiS.getSingleDesignation(element.designation).subscribe(responseD=>{
              this.employeeList.push({...element, ...response.data, _destination: responseD.data[0]['designation'], empId: element['_id'], checked: false});
              if(index === array.length -1) resolve()
            });  
          });
        })
      });
    })
  }

}
