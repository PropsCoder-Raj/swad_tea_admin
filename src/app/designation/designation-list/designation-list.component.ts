import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.scss']
})
export class DesignationListComponent implements OnInit {

  @ViewChild('table') table: any;
  dataTable:any;
  dataList: Array<any> = [];
  printData: Array<any> = [];

  constructor(public title: Title, public apiS: ApiService, public router: Router, public toastr: ToastrService, public excelS: ExcelService) {
    title.setTitle("Designation List | Swadchai");
    this.getData();
  }

  getData(){
    this.dataList = [];
    this.apiS.getAllDesignation().subscribe(data=>{
      this.dataList = data.data;
      let cnt = 1;
          this.dataList.forEach(element =>{
            this.printData.push({
              "Sr. No.": cnt,
              "Designation": element['designation'],
              "Status": element['status']
            })
            cnt++;
          });
      setTimeout(() => {
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
      }, 500);
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
    this.excelS.exportAsExcelFile(this.printData, 'Designation Data '+ toToday);
  }

  refresh(): void {
    this.getData();
  }

  updateData(id: any){
    this.router.navigate(['/designation/activity/edit'], { queryParams: { id: id }});
  }

  updateStatus(id: any, status: any){
    this.apiS.updateDesignationStatus(status, id).subscribe((response) => {
      if(response.status === 'success'){
        this.toastr.success(response.message);
        this.getData();
      }
    });
  }

  deleteData(id: any){
    this.apiS.deleteDesignation(id).subscribe((response) => {
      if(response.status === 'success'){
        this.toastr.success(response.message);
        location.reload();
      }
    });
  }

}
