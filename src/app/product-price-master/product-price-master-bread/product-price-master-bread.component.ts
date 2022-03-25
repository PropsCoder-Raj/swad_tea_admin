import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';

@Component({
  selector: 'app-product-price-master-bread',
  templateUrl: './product-price-master-bread.component.html',
  styleUrls: ['./product-price-master-bread.component.scss']
})
export class ProductPriceMasterBreadComponent implements OnInit {

  edit = false;
  editId = '';
  productList: Array<any> = [];

  productCode = '';
  productName = '';
  uom = '';
  stdSize = '';
  mrp = '';
  discount = '';
  retailerRate = '';
  productId = '';

  constructor(public title: Title, public route: ActivatedRoute, public router: Router, public toastr: ToastrService, public apiS: ApiService) { }

  ngOnInit(): void {
    this.apiS.getAllProductMaster().subscribe(response=>{
      this.productList = response.data;
    });
    this.route.params.subscribe((data: any)=>{
      if(data.action == "create"){
        this.edit = false;
        this.title.setTitle("Create Product Price | Swadchai");
      }else{
        this.edit = true;
        this.title.setTitle("Update Product Price | Swadchai");
        this.route.queryParams.subscribe((params: any) =>{
          this.editId = params.id;
          this.apiS.getSingleProductPriceMaster(this.editId).subscribe((response: any) => {
            this.productCode = response.data[0].productCode;
            this.productName = response.data[0].productName;
            this.uom = response.data[0].uom;
            this.stdSize = response.data[0].stdSize;
            this.mrp = response.data[0].mrp;
            this.discount = response.data[0].discount;
            this.retailerRate = response.data[0].retailerRate;
            this.productId = response.data[0].product;
          });
        })
      }  
    });  
  }

  onchange(){
    this.productList.forEach(element=>{
      if(element['_id'] === this.productId){
        this.productName = element['productName'];
        this.productCode = element['productCode'];
        this.uom = element['uom'];
        this.stdSize = element['stdSize'];
      }
    });
  }

  submit(){
    if(this.productCode === null || this.productCode === '' || this.productCode === undefined){
      this.toastr.error("Please Enter Product Code");
      return;
    }

    if(this.productName === null || this.productName === '' || this.productName === undefined){
      this.toastr.error("Please Enter Product Name");
      return;
    }

    if(this.uom === null || this.uom === '' || this.uom === undefined){
      this.toastr.error("Please Select UOM");
      return;
    }

    if(this.stdSize === null || this.stdSize === '' || this.stdSize === undefined){
      this.toastr.error("Please Enter Std Size");
      return;
    }

    if(this.mrp === null || this.mrp === '' || this.mrp === undefined){
      this.toastr.error("Please Select Brand");
      return;
    }

    if(this.discount === null || this.discount === '' || this.discount === undefined){
      this.toastr.error("Please Select Group");
      return;
    }

    if(this.retailerRate === null || this.retailerRate === '' || this.retailerRate === undefined){
      this.toastr.error("Please Select Size");
      return;
    }

    if(this.edit != false){
      this.apiS.updateProductPriceMaster(this.productCode, this.productName, this.uom, this.stdSize, this.mrp, this.discount, this.retailerRate, this.productId, this.editId).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/product-price-master/list']);
        }
      })
    }else{
      this.apiS.createProductPriceMaster(this.productCode, this.productName, this.uom, this.stdSize, this.mrp, this.discount, this.retailerRate, this.productId).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/product-price-master/list']);
        }
      })
    }
  }

}
