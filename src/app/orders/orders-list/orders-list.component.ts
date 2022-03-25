import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  @ViewChild('table1') table1: any;
  @ViewChild('table2') table2: any;
  dataTable1: any;
  dataTable2: any;
  dataList: Array<any> = [];
  invoiceList: Array<any> = [];
  printData: Array<any> = [];
  viewList: any;

  proformaInvoiceNo = '';
  _id = '';
  firmName = '';
  employeeName = '';
  retailerName = '';
  items: Array<any> = [];
  offersItems: Array<any> = [];
  transport: any = [];
  subTotal = 0;
  commission = 0;
  totalAmount = 0;
  cgst = 0;
  sgst = 0;

  constructor(public title: Title, public apiS: ApiService, public router: Router, public toastr: ToastrService, public excelS: ExcelService) {
    title.setTitle("Orders List | Swadchai");
    this.getData();
    this.apiS.getAllTransport().subscribe(data => {
      this.transport = data.data;
    });
  }

  getData() {
    this.invoiceList = [];
    this.dataList = [];
    this.apiS.getAllOrders().subscribe(data => {
      console.log(data)
      data.data.forEach((element: any)=>{
        if(element['invoiceStatus'] == true){
          this.invoiceList.push({ ...element });
        }else{
          this.dataList.push({ ...element });
        }
      });
      let cnt = 1;
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

  print(id: any){
    const url = this.router.createUrlTree(['/orders/invoice/'+id]);
    window.open(url.toString(), '_blank')
  }

  viewData(item: any){
    console.log(item);
    this.viewList = item;
    this.proformaInvoiceNo = item.proformaInvoiceNo;
    this._id = item._id;
    this.firmName = item.retailerData[0].firmName;
    this.employeeName = item.employeeData[0].name;
    this.items = item.items;
    this.subTotal = item.subTotal;
    this.totalAmount = item.totalAmount;
    this.cgst = item.cgst;
    this.sgst = item.sgst;
    if(item.offers){
      this.offersItems = item.offers;
    }
    this.commission = item.commission;
    // this.retailerName = item.retailerData[0].firmName;
  }

  procced(id: any){
    this.apiS.updateOrderInvoiceStatus(id).subscribe(response=>{
      if(response.status === 'success'){
        this.toastr.success(response.message);
        this.dataTable1 = $(this.table1.nativeElement);
        this.dataTable1.DataTable().destroy();
        this.dataTable2 = $(this.table2.nativeElement);
        this.dataTable2.DataTable().destroy();
        this.getData();
      }
    })
  }

  refresh(): void {
    this.getData();
  }
}
