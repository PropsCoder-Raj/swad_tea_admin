import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';

@Component({
  selector: 'app-scheme-bread',
  templateUrl: './scheme-bread.component.html',
  styleUrls: ['./scheme-bread.component.scss']
})
export class SchemeBreadComponent implements OnInit {
  breadStatus = true;
  edit = false;
  editId = '';

  productType = '';
  product = '';
  targetKg = 0;
  stdSize = 0;
  freeKg = 0;
  productList: Array<any> = [];

  constructor(public route: ActivatedRoute, public title: Title, public toastr: ToastrService, public apiS : ApiService, public router: Router) { }

  ngOnInit(): void {
    
    this.apiS.getAllProductMaster().subscribe(response=>{
      this.productList = response.data;
    });
    this.route.params.subscribe((data: any)=>{
      if(data.action == "create"){
        this.edit = false;
        this.title.setTitle("Create Scheme | Swadchai");
      }else{
        this.edit = true;
        this.title.setTitle("Update Scheme | Swadchai");
        this.route.queryParams.subscribe((params: any) =>{
          this.editId = params.id;
          this.apiS.getSingleScheme(this.editId).subscribe((response: any) => {
            this.productType = response.data[0].productType;
            this.targetKg = response.data[0].targetKg;
            this.stdSize = response.data[0].stdSize;
            this.freeKg = response.data[0].freeKg;
            this.product = response.data[0].productId;
          });
        })
      }  
    });  
  }

  submit(){
    
    if(this.product === null || this.product === '' || this.product === undefined){
      this.toastr.error("Please Select Product");
      return;
    }

    if(this.productType === null || this.productType === '' || this.productType === undefined){
      this.toastr.error("Please Select Product type");
      return;
    }

    if(this.targetKg === null || this.targetKg === 0 || this.targetKg === undefined){
      this.toastr.error("Please Enter Target Kg");
      return;
    }

    if(this.stdSize === null || this.stdSize === 0 || this.stdSize === undefined){
      this.toastr.error("Please Enter Std Size");
      return;
    }

    if(this.freeKg === null || this.freeKg === 0 || this.freeKg === undefined){
      this.toastr.error("Please Enter Free Kg");
      return;
    }

    if(this.edit != false){
      this.apiS.updateScheme(this.productType, this.targetKg, this.stdSize, this.freeKg, this.product, this.editId).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/scheme/list']);
        }
      })
    }else{
      this.apiS.createScheme(this.productType, this.targetKg, this.stdSize, this.freeKg, this.product).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/scheme/list']);
        }
      })
    }
  }

}