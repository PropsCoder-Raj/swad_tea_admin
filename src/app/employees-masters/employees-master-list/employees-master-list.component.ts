import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { UserService } from 'src/app/_helper/user/user.service';
declare var $: any;

@Component({
  selector: 'app-employees-master-list',
  templateUrl: './employees-master-list.component.html',
  styleUrls: ['./employees-master-list.component.scss']
})
export class EmployeesMasterListComponent implements OnInit {
  
  @ViewChild('table') table: any;
  dataTable:any;
  dataList: Array<any> = [];
  printData: Array<any> = [];

  constructor(public title: Title, public apiS: ApiService, public router: Router,public excelS: ExcelService, public toastr: ToastrService, public userS: UserService) {
    title.setTitle("Employees Master List | Swadchai");
    this.getData();
  }

  getData(){
    this.dataList = [];
    this.apiS.getAllEmployeeMaster().subscribe(data=>{
      if(data.data.length > 0){
        let myPromise = new Promise<any>((resolve: any, reject: any) =>{
          data.data.forEach((element: any, index: any, array: any)=>{
            this.userS.getSingleUser(element.user).subscribe(response=>{
              this.apiS.getSingleDesignation(element.designation).subscribe(responseD=>{
                this.dataList.push({...element, ...response.data, _destination: responseD.data[0]['designation'], empId: element['_id']});
                if(index === array.length -1) resolve()
              });  
            });
          })
        });

        myPromise.then(response =>{
          console.log(this.dataList);
          let cnt = 1;
          let alloatedArea = '';
          let blackoutArea = '';
          this.dataList.forEach((element: any) =>{
            if(element['alloatedArea']){
              let arr : Array<any> = element['alloatedArea'];
              arr.forEach((_element: any)=>{
                alloatedArea += _element + ', ';
                console.log(alloatedArea);
              })
            }
            if(element['blackoutArea']){
              let arr : Array<any> = element['blackoutArea'];
              arr.forEach((_element: any)=>{
                blackoutArea += _element + ', ';
                console.log(blackoutArea);
              })
            }
            this.printData.push({
              "Sr. No.": cnt,
              "Name": element['name'],
              "City": element['city'],
              "Mobile No": element['mobileNo'],
              "Email ID": element['email'],
              "Aadhar CARD": element['aadharCard'],
              "Area of Expertise": element['areaOfExpertise'],
              "Designation": element['_destination'],
              "Reporting To": element['reportingTo'],
              "Alloated Area": alloatedArea,
              "Blackout Area": blackoutArea,
              "Target In Kg": element['targetInKg'],
              "UserID": element['userId'],
              "Status": element['status'],
            })
            cnt++;
          });
          setTimeout(() => {
            this.dataTable = $(this.table.nativeElement);
            this.dataTable.DataTable();
          }, 500);
        })
      }
    });
  }

  ngOnInit(): void {
      
  }

  refresh(): void {
    this.getData();
  }

  exportAsXLSX():void {
    var dToday = new Date();
    var monthToday = dToday.getMonth() + 1;
    var dayToday = dToday.getDate();
    var yearToday = dToday.getFullYear();
    var hour = dToday.getHours();
    var min = dToday.getMinutes();
    var sec = dToday.getSeconds();

    var toToday = [yearToday, monthToday, dayToday, hour, min, sec].join('-');
    this.excelS.exportAsExcelFile(this.printData, 'Employee Master Data '+ toToday);
  }

  updateData(id: any){
    this.router.navigate(['/employees-masters/edit'], { queryParams: { id: id }});
  }

  deleteData(id: any){
    this.apiS.deleteEmployeeMaster(id).subscribe((response) => {
      if(response.status === 'success'){
        this.toastr.success(response.message);
        location.reload();
      }
    });
  }

  updateStatus(id: any, status: any){
    this.userS.updateUserStatus(status, id).subscribe((response) => {
      if(response.status === 'success'){
        this.toastr.success(response.message);
        this.getData();
      }
    });
  }

}
