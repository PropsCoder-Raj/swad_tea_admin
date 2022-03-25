import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
declare var $: any;

@Component({
  selector: 'app-product-price-master-list',
  templateUrl: './product-price-master-list.component.html',
  styleUrls: ['./product-price-master-list.component.scss']
})
export class ProductPriceMasterListComponent implements OnInit {

  @ViewChild('table') table: any;
  dataTable:any;
  dataList: Array<any> = [];
  printData: Array<any> = [];

  mrp = '';
  discount = '';
  retailerRate = '';
  productId = '';
  updateStatus = false;

  constructor(public title: Title, public apiS: ApiService, public router: Router, public toastr: ToastrService, public excelS: ExcelService) {
    title.setTitle("Product Price Master List | Swadchai");
    this.getData()
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
              "Std Size": element['stdSize'],
              "MRP": element['mrp'],
              "Discount": element['discount'],
              "Retailer Rate": element['retailerRate']
            })
            cnt++;
          });
      setTimeout(() => {
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
      }, 500);
    });
  }

  showInput(item: any, field: any){
    this.clear();
    $("#"+ field +"Input"+ item._id).show();
    $("#"+ field +"Input"+ item._id).focus();
    $("#"+ field +"Input"+ item._id).val(item.mrp);
    $("#"+ field +"Label"+ item._id).hide();

    
    this.mrp = item.mrp;
    this.discount = item.discount;
    this.retailerRate = item.retailerRate;
    this.productId = item._id;
    
    var input : any = document.getElementById(field +"Input"+item._id);
    input.addEventListener("keyup", function(event: any) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("updateP")?.click();
      }
    });
  }

  updateP(){
    if(this.updateStatus === false){
      this.updateStatus = true;
      this.updatePrice(this.mrp, this.discount, this.retailerRate, this.productId);
      this.clear()
    }
  }

  clear(){
    this.mrp = "";
    this.discount = "";
    this.retailerRate = "";
    this.productId = "";
  }

  updatePrice(mrp: any, discount: any, retailerRate: any, id: any){
    this.apiS.updateProductPrice(mrp, discount, retailerRate, id).subscribe(response=>{
      console.log(response)
      if(response.status == 'success'){
        $("#employeesTable").DataTable().destroy();
        this.toastr.success(response.message);
        this.getData();
        setTimeout(() =>{
          this.updateStatus = false;
        }, 1000);
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
    this.excelS.exportAsExcelFile(this.printData, 'Product Price Master Data '+ toToday);
  }

  refresh(): void {
    $("#employeesTable").DataTable().destroy();
    this.getData();
  }

  updateData(id: any){
    this.router.navigate(['/product-price-master/activity/edit'], { queryParams: { id: id }});
  }

  deleteData(id: any){
    this.apiS.deleteProductPriceMaster(id).subscribe((response) => {
      if(response.status === 'success'){
        this.toastr.success(response.message);
        location.reload();
      }
    });
  }
}
