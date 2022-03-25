import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';

@Component({
  selector: 'app-products-master-list',
  templateUrl: './products-master-list.component.html',
  styleUrls: ['./products-master-list.component.scss']
})
export class ProductsMasterListComponent implements OnInit {

  @ViewChild('table') table: any;
  dataTable:any;
  dataList: Array<any> = [];
  printData: Array<any> = [];

  constructor(public title: Title, public apiS: ApiService, public router: Router, public toastr: ToastrService, public excelS: ExcelService) {
    title.setTitle("Products Master List | Swadchai");
    this.getData();
  }

  getData(){
    this.dataList = [];
    this.apiS.getAllProductMaster().subscribe(data=>{
      this.dataList = data.data;
        let cnt = 1;
          this.dataList.forEach(element =>{
            this.printData.push({
              "Sr. No.": cnt,
              "Product Code": element['productCode'],
              "Product Name": element['productName'],
              "Product Hindi Name": element['productHindiName'],
              "UOM": element['uom'],
              "Brand": element['brand'],
              "Group": element['group'],
              "Size": element['size'],
              "HSN No": element['hsnNo'],
              "Std Size": element['stdSize']
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
    this.excelS.exportAsExcelFile(this.printData, 'Product Master Data '+ toToday);
  }

  refresh(): void {
    this.getData();
  }

  updateData(id: any){
    this.router.navigate(['/products-master/activity/edit'], { queryParams: { id: id }});
  }

  deleteData(id: any){
    this.apiS.deleteProductMaster(id).subscribe((response) => {
      if(response.status === 'success'){
        this.toastr.success(response.message);
        location.reload();
      }
    });
  }

}
