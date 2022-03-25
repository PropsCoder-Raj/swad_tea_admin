import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';

@Component({
  selector: 'app-policy-master-list',
  templateUrl: './policy-master-list.component.html',
  styleUrls: ['./policy-master-list.component.scss']
})
export class PolicyMasterListComponent implements OnInit {

  @ViewChild('table1') table1: any;
  @ViewChild('table2') table2: any;
  dataTable1:any;
  dataTable2:any;
  dataList: Array<any> = [];
  printData: Array<any> = [];

  constructor(public title: Title, public apiS: ApiService, public router: Router, public toastr: ToastrService, public excelS: ExcelService) {
    title.setTitle("Policy Master List | Swadchai");
    this.getData();
  }

  getData(){
    this.dataList = [];
    this.apiS.getAllPolicyMaster().subscribe(data=>{
      this.dataList = data.data;
      let cnt = 1;
          this.dataList.forEach(element =>{
            this.printData.push({
              "Sr. No.": cnt,
              "Sales Team Incentive": element['salesTeamIncentive'],
              "Sales Team Target": element['salesTeamTarget'],
              "BirthDay offer Incentive": element['birthDayOfferIncentive'],
              "Retailer Incentive": element['retailerIncentive'],
              "Retailer Target": element['retailerTarget'],
              "Retailer Free TEA": element['retailerFreeTEA'],
              "Retailer BirthDay Offer Incentive": element['retailerBirthDayOfferIncentive']
            })
            cnt++;
          });
      setTimeout(() => {
        this.dataTable1 = $(this.table1.nativeElement);
        this.dataTable1.DataTable();
        this.dataTable2 = $(this.table2.nativeElement);
        this.dataTable2.DataTable();
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
    this.excelS.exportAsExcelFile(this.printData, 'Policy Master Data '+ toToday);
  }

  refresh(): void {
    this.getData();
  }

  updateData(id: any){
    this.router.navigate(['/policy-master/activity/edit'], { queryParams: { id: id }});
  }

  deleteData(id: any){
    this.apiS.deletePolicyMaster(id).subscribe((response) => {
      if(response.status === 'success'){
        this.toastr.success(response.message);
        location.reload();
      }
    });
  }

}
