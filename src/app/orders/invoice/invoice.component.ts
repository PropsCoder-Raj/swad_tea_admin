import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as converter from 'number-to-words';
import { ApiService } from 'src/app/_helper/api/api.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  @ViewChild('contentToConvert', {static: true}) el !: ElementRef;

  loader = false;

  recipientName = '';
  contactPerson = '';
  contactNo = '';
  address = '';
  gstin = '';
  state = '';
  fssailicNo = '';
  
  proformaInvoiceNo = '';
  date = '';
  transportName = '';
  transportContact = '';

  items : Array<any> = [];

  subTotal = 0;
  commission = 0;
  cgst = 0;
  sgst = 0;
  totalBag = 0;
  totalQty = 0;
  totalkgpkt = 0;
  totalAmount = 0;
  totalAmountInWords = '';

  array = [
    {
      hsn: 'O90240',productName: 'SWARG DUST PKT',size: '1 KG',bag: '10',qty: '40',kgpkt: 'KG',kgpcs: 300,discount: 3,rate: 244.44,amount: 73443.00
    },{
      hsn: 'O90240',productName: 'SWARG DUST PKT',size: '1 KG',bag: '10',qty: '40',kgpkt: 'KG',kgpcs: 300,discount: 3,rate: 244.44,amount: 73443.00
    },{
      hsn: 'O90240',productName: 'SWARG DUST PKT',size: '1 KG',bag: '10',qty: '40',kgpkt: 'KG',kgpcs: 300,discount: 3,rate: 244.44,amount: 73443.00
    },{
      hsn: 'O90240',productName: 'SWARG DUST PKT',size: '1 KG',bag: '10',qty: '40',kgpkt: 'KG',kgpcs: 300,discount: 3,rate: 244.44,amount: 73443.00
    },{
      hsn: 'O90240',productName: 'SWARG DUST PKT',size: '1 KG',bag: '10',qty: '40',kgpkt: 'KG',kgpcs: 300,discount: 3,rate: 244.44,amount: 73443.00
    },{
      hsn: 'O90240',productName: 'SWARG DUST PKT',size: '1 KG',bag: '10',qty: '40',kgpkt: 'KG',kgpcs: 300,discount: 3,rate: 244.44,amount: 73443.00
    },{
      hsn: 'O90240',productName: 'SWARG DUST PKT',size: '1 KG',bag: '10',qty: '40',kgpkt: 'KG',kgpcs: 300,discount: 3,rate: 244.44,amount: 73443.00
    },{
      hsn: 'O90240',productName: 'SWARG DUST PKT',size: '1 KG',bag: '10',qty: '40',kgpkt: 'KG',kgpcs: 300,discount: 3,rate: 244.44,amount: 73443.00
    }
  ]

  orderId= '';
  ordersEmpId = '';
  ordersRetailerId = '';

  constructor(public route: ActivatedRoute, public apiS: ApiService) { }

  ngOnInit(): void {
    this.apiS.getAllTransport().subscribe(data => {
      this.transportName = data['data'][0]['transporterName'];
      this.transportContact = data['data'][0]['mobile'];
    });
    this.route.params.subscribe(data=>{
      this.orderId = data['id'];
      this.apiS.getSingleOrder(this.orderId).subscribe(orderData=>{
        this.ordersEmpId = orderData['data'][0]['empId'];
        this.ordersRetailerId = orderData['data'][0]['retailerId'];
        this.date = orderData['data'][0]['createdAt'];
        this.proformaInvoiceNo = orderData['data'][0]['_id'].substring(0, 10);
        this.items = orderData['data'][0]['items'];

        this.commission = orderData['data'][0]['commission'];
        this.cgst = orderData['data'][0]['cgst'];
        this.sgst = orderData['data'][0]['sgst'];
        this.totalAmount = orderData['data'][0]['totalAmount'];
        this.subTotal = orderData['data'][0]['subTotal'];
        this.totalAmountInWords = converter.toWords(this.totalAmount);

        this.items.forEach(element => {
          this.totalBag = this.totalBag + Number(element['bag']);
          this.totalQty = this.totalQty + Number(element['quantity']);
          this.totalkgpkt = this.totalkgpkt + Number(element['totalkgpkt']);
        });
        console.log(orderData['data'][0]);

        
        this.apiS.getSingleRetailerMaster(this.ordersRetailerId).subscribe(retailerData=>{
          this.contactPerson = retailerData['data'][0]['userData'][0]['contactPersonName'];
          this.contactNo = retailerData['data'][0]['userData'][0]['mobileNo'];
          this.state = retailerData['data'][0]['userData'][0]['state'];
          this.address = retailerData['data'][0]['userData'][0]['address'];
          this.recipientName = retailerData['data'][0]['firmName'];
          this.gstin = retailerData['data'][0]['gstinNo'];
          this.fssailicNo = retailerData['data'][0]['fssailicNo'];
          window.print();
          window.close();
        })
      })
    });
  }

}
