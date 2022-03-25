import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { UserService } from 'src/app/_helper/user/user.service';
declare var $: any;

@Component({
  selector: 'app-retailers-masters-list',
  templateUrl: './retailers-masters-list.component.html',
  styleUrls: ['./retailers-masters-list.component.scss']
})
export class RetailersMastersListComponent implements OnInit {
  
  @ViewChild('table') table: any;
  dataTable:any;
  dataList: Array<any> = [];
  printData: Array<any> = [];

  constructor(public title: Title, public router: Router, public apiS: ApiService, public excelS: ExcelService, public toastr: ToastrService, public userS: UserService) {
    title.setTitle("Retailers Master List | Swadchai");
    this.getData();
  }

  getData(){
    this.dataList = [];
    this.apiS.getAllRetailerMaster().subscribe(data=>{
      if(data.data.length > 0){
        let myPromise = new Promise<any>((resolve: any, reject: any) =>{
          data.data.forEach((element: any, index: any, array: any)=>{
            this.userS.getSingleUser(element.user).subscribe(response=>{
                this.dataList.push({...element, ...response.data, empId: element['_id']});
                if(index === array.length -1) resolve()
            });
          })
        });

        myPromise.then(response =>{
          let cnt = 1;
          this.dataList.forEach(element =>{
            this.printData.push({
              "Sr. No.": cnt,
              "Firm Name": element['firmName'],
              "City": element['city'],
              "Contact Person Name": element['contactPersonName'],
              "Mobile No": element['mobileNo'],
              "Email ID": element['email'],
              "GSTIN No": element['gstinNo'],
              "FSSAI LIC No": element['fssailicNo'],
              "Potential Sale in Kg": element['potentialSale'],
              "Target In Kg": element['target'],
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

  exportAsXLSX():void {
    var dToday = new Date();
    var monthToday = dToday.getMonth() + 1;
    var dayToday = dToday.getDate();
    var yearToday = dToday.getFullYear();
    var hour = dToday.getHours();
    var min = dToday.getMinutes();
    var sec = dToday.getSeconds();

    var toToday = [yearToday, monthToday, dayToday, hour, min, sec].join('-');
    this.excelS.exportAsExcelFile(this.printData, 'Retailers Master Data '+ toToday);
  }

  refresh(): void {
    this.getData();
  }

  updateData(id: any){
    this.router.navigate(['/retailers-masters/edit'], { queryParams: { id: id }});
  }

  deleteData(id: any){
    this.apiS.deleteRetailerMaster(id).subscribe((response) => {
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
