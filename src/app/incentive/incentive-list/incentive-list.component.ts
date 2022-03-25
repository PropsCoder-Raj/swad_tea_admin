import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { UserService } from 'src/app/_helper/user/user.service';
declare var $: any;


@Component({
  selector: 'app-incentive-list',
  templateUrl: './incentive-list.component.html',
  styleUrls: ['./incentive-list.component.scss']
})
export class IncentiveListComponent implements OnInit {
  
  @ViewChild('table') table: any;
  dataTable:any;
  @ViewChild('table_1') table_1: any;
  dataTable_1:any;
  @ViewChild('table_2') table_2: any;
  dataTable_2:any;

  dataList: Array<any> = [];
  printData: Array<any> = [];

  name = '';
  mobileNo = '';
  email = '';
  areaOfExpertise = '';
  destination = '';
  targetInKg = '';
  userId = '';
  totalIncentive = '';

  incentiveList : Array<any> = [];
  incentiveTrasactionList : Array<any> = [];
  incentiveId = '';
  employeeId = '';
  balance = 0;

  constructor(public authS: AuthService,public title: Title, public apiS: ApiService, public router: Router,public excelS: ExcelService, public toastr: ToastrService, public userS: UserService) {
    title.setTitle("Incentive List | Swadchai");
    this.getData();
  }

  getData(){
    this.dataList = [];
    this.apiS.getAllEmployeeMasterWithIncentive().subscribe(data=>{
      if(data.data.length > 0){
        let myPromise = new Promise<any>((resolve: any, reject: any) =>{
          data.data.forEach((element: any, index: any, array: any)=>{
            this.userS.getSingleUser(element.data.user).subscribe(response=>{
              this.apiS.getSingleDesignation(element.data.designation).subscribe(responseD=>{
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

  viewEmp(id: any, name: any,mobileNo: any,email: any,areaOfExpertise: any,destination: any,targetInKg: any,userId: any,totalIncentive: any){
    this.incentiveList = [];
    this.name = name;
    this.mobileNo = mobileNo;
    this.email = email;
    this.areaOfExpertise = areaOfExpertise;
    this.destination = destination;
    this.targetInKg = targetInKg;
    this.userId = userId;
    this.totalIncentive = totalIncentive;
    this.getDateTable(id);
    this.getTransactionTable(id);
    this.employeeId = id;
  }

  getDateTable(id: any){
    this.incentiveList = [];
    $("#table_1").DataTable().destroy();
    this.apiS.getAllIncentiveWithEmp(id).subscribe((response=>{
      this.incentiveList = response.data;
      setTimeout(() => {
        this.dataTable_1 = $(this.table_1.nativeElement);
        this.dataTable_1.DataTable();
      }, 500);
    }))
  }

  getTransactionTable(id: any){
    this.incentiveTrasactionList = [];
    $("#table_2").DataTable().destroy();
    this.apiS.getAllIncentiveTransaction(id).subscribe((response=>{
      this.incentiveTrasactionList = response.data;
      setTimeout(() => {
        this.dataTable_2 = $(this.table_2.nativeElement);
        this.dataTable_2.DataTable();
      }, 500);
    }))
  }

  check(id: any, balance: any){
    this.incentiveId = id;
    this.balance = balance;
  }

  updateIncentive(){
    this.apiS.updateIncentive(0, this.balance, this.incentiveId).subscribe(response=>{
      this.toastr.success(response.message);
      if(response.status === 'success'){
        this.apiS.createIncentiveTransaction(this.balance, this.incentiveId, this.employeeId).subscribe(res=>{
          if(res.status === 'success'){
            this.getDateTable(this.incentiveId); 
            this.getTransactionTable(this.incentiveId); 
            $("#closeModelBtn");
          }
        })
      }
    });
  }

  refresh(): void {
    this.getData();
  }

}
