import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { UserService } from 'src/app/_helper/user/user.service';
declare var $: any;

@Component({
  selector: 'app-scheme-list',
  templateUrl: './scheme-list.component.html',
  styleUrls: ['./scheme-list.component.scss']
})
export class SchemeListComponent implements OnInit {
  
  @ViewChild('table') table: any;
  dataTable:any;
  dataList: Array<any> = [];
  printData: Array<any> = [];

  target = '';
  commission = '';
  commissionData:any;

  constructor(public title: Title, public router: Router, public apiS: ApiService, public excelS: ExcelService, public toastr: ToastrService, public userS: UserService) {
    title.setTitle("Scheme List | Swadchai");
    
  }

  ngOnInit(): void {
    this.getData();
  }

  

  submit(){
    if(this.target === ''){
      this.toastr.error("Type Target");
      return;
    }
    if(this.commission === ''){
      this.toastr.error("Type Commission");
      return;
    }
    this.apiS.createCommission(this.target, this.commission).subscribe(data => {
      if(data['status'] === 'success'){
        this.toastr.success(data.message);
        $("#close").click();
      }
    })
  }

  getData(){
    this.dataList = [];
    this.apiS.getAllScheme().subscribe(data=>{
      this.dataList = data.data;
      console.log(data);
      let cnt = 1;
          this.dataList.forEach(element =>{
            this.printData.push({
              "Sr. No.": cnt,
              "Product Name": element['productData'][0]['productName'],
              "Product Type": element['productType'],
              "Target Kg": element['targetKg'],
              "Std Size": element['stdSize'],
              "Free Kg": element['freeKg'],
            })
            cnt++;
          });
      setTimeout(() => {
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
      }, 500);
    });

    this.apiS.getAllCommission().subscribe(data=>{
      this.commissionData = data.data;
      console.log(data);
    });
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
    this.excelS.exportAsExcelFile(this.printData, 'Policy Master Data '+ toToday);
  }

  updateData(id: any){
    this.router.navigate(['/scheme/activity/edit'], { queryParams: { id: id }});
  }

  deleteData(id: any){
    this.apiS.deleteScheme(id).subscribe((response) => {
      if(response.status === 'success'){
        this.toastr.success(response.message);
        location.reload();
      }
    });
  }

}
