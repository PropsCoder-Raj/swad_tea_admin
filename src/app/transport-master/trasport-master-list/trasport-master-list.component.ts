import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';

@Component({
  selector: 'app-trasport-master-list',
  templateUrl: './trasport-master-list.component.html',
  styleUrls: ['./trasport-master-list.component.scss']
})
export class TrasportMasterListComponent implements OnInit {

  @ViewChild('table1') table1: any;
  dataTable1:any;
  dataList: Array<any> = [];
  printData: Array<any> = [];

  constructor(public title: Title, public apiS: ApiService, public router: Router, public toastr: ToastrService, public excelS: ExcelService) {
    title.setTitle("Transport Master List | Swadchai");
    this.getData();
  }

  getData(){
    this.dataList = [];
    this.apiS.getAllTransport().subscribe(data=>{
      this.dataList = data.data;
      let cnt = 1;
          this.dataList.forEach(element =>{
            this.printData.push({
              "Sr. No.": cnt,
              "Transporter Name": element['transporterName'],
              "Contact Person Name": element['contactPersonName'],
              "GST Transporter Name": element['gstTransporterName'],
              "Mobile": element['mobile'],
              "Address": element['address']
            })
            cnt++;
          });
      setTimeout(() => {
        this.dataTable1 = $(this.table1.nativeElement);
        this.dataTable1.DataTable();
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
    this.excelS.exportAsExcelFile(this.printData, 'Transport Master Data '+ toToday);
  }

  refresh(): void {
    this.getData();
  }

  updateData(id: any){
    this.router.navigate(['/transport-master/activity/edit'], { queryParams: { id: id }});
  }

  deleteData(id: any){
    this.apiS.deleteTransport(id).subscribe((response) => {
      if(response.status === 'success'){
        this.toastr.success(response.message);
        location.reload();
      }
    });
  }

}  