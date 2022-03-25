import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';
declare var $: any;

@Component({
  selector: 'app-products-master-bread',
  templateUrl: './products-master-bread.component.html',
  styleUrls: ['./products-master-bread.component.scss']
})
export class ProductsMasterBreadComponent implements OnInit {

  breadStatus = true;
  edit = false;
  editId = '';

  productCode = '';
  productName = '';
  productHindiName = '';
  tag = '';
  uom = '';
  brand = '';
  group = '';
  size = '';
  hsnNo = '';
  productType = '';
  stdSize = 0;

  type = [
    { name: 'Packet', checked: false },
    { name: 'Loose', checked: false },
  ]

  productNameEditor !: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
  ];

  constructor(public route: ActivatedRoute, public title: Title, public toastr: ToastrService, public apiS: ApiService, public router: Router) { }

  alphanumericGenerate() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    const length = 6;
    let randomStr = "";

    for (let i = 0; i < length; i++) {
      const randomNum = Math.floor(Math.random() * characters.length);
      randomStr += characters[randomNum];
    }

    this.productCode = randomStr;
  }

  ngOnInit(): void {
    this.productNameEditor = new Editor();
    this.alphanumericGenerate();
    this.route.params.subscribe((data: any) => {
      if (data.action == "create") {
        this.edit = false;
        this.title.setTitle("Create Product | Swadchai");
      } else {
        this.edit = true;
        this.title.setTitle("Update Product | Swadchai");
        this.route.queryParams.subscribe((params: any) => {
          this.editId = params.id;
          this.apiS.getSingleProductMaster(this.editId).subscribe((response: any) => {
            this.productCode = response.data[0].productCode;
            this.productName = response.data[0].productName;
            this.productType = response.data[0].productType;
            $("#option" + response.data[0].productType).prop("checked", true);
            // for (let index = 0; index < this.type.length; index++) {
            //   if(this.productType == this.type[index]['name']){
            //     this.type[index]['checked'] = true;
            //   }else{
            //     this.type[index]['checked'] = false;
            //   }
            // }
            this.productHindiName = response.data[0].productHindiName;
            this.tag = response.data[0].tag;
            this.uom = response.data[0].uom;
            this.brand = response.data[0].brand;
            this.group = response.data[0].group;
            this.size = response.data[0].size;
            this.hsnNo = response.data[0].hsnNo;
            this.stdSize = response.data[0].stdSize;
          });
        })
      }
    });
  }

  checkRadio(name: any) {
    for (let index = 0; index < this.type.length; index++) {
      if (name == this.type[index]['name']) {
        this.type[index]['checked'] = true;
      } else {
        this.type[index]['checked'] = false;
      }
    }
  }

  ngOnDestroy() {
    this.productNameEditor.destroy();
  }

  submit() {

    this.type.forEach(data => {
      console.log(data);
      if (data['checked'] === true) {
        this.productType = data['name'];
      }
    });

    if (this.productCode === null || this.productCode === '' || this.productCode === undefined) {
      this.toastr.error("Please Enter Product Code");
      return;
    }

    if (this.productName === null || this.productName === '' || this.productName === undefined) {
      this.toastr.error("Please Enter Product Name");
      return;
    }

    if (this.productType === null || this.productType === '' || this.productType === undefined) {
      this.toastr.error("Please Select Product Type");
      return;
    }


    if (this.tag === null || this.tag === '' || this.tag === undefined) {
      this.toastr.error("Please Enter Tag");
      return;
    }

    if (this.uom === null || this.uom === '' || this.uom === undefined) {
      this.toastr.error("Please Select UOM");
      return;
    }

    if (this.brand === null || this.brand === '' || this.brand === undefined) {
      this.toastr.error("Please Select Brand");
      return;
    }

    if (this.group === null || this.group === '' || this.group === undefined) {
      this.toastr.error("Please Select Group");
      return;
    }

    if (this.size === null || this.size === '' || this.size === undefined) {
      this.toastr.error("Please Select Size");
      return;
    }

    if (this.hsnNo === null || this.hsnNo === '' || this.hsnNo === undefined) {
      this.toastr.error("Please Enter HSN No");
      return;
    }

    if (this.stdSize === null || this.stdSize === 0 || this.stdSize === undefined) {
      this.toastr.error("Please Enter Std Size");
      return;
    }

    if (this.edit != false) {
      this.apiS.updateProductMaster(this.productCode, this.productName, this.productType, this.productHindiName, this.tag, this.uom, this.brand, this.group, this.size, this.hsnNo, this.stdSize, this.editId).subscribe(response => {
        if (response.status === 'success') {
          this.toastr.success(response.message);
          this.router.navigate(['/products-master/list']);
        }
      })
    } else {
      this.apiS.createProductMaster(this.productCode, this.productName, this.productType, this.productHindiName, this.tag, this.uom, this.brand, this.group, this.size, this.hsnNo, this.stdSize).subscribe(response => {
        if (response.status === 'success') {
          this.toastr.success(response.message);
          this.router.navigate(['/products-master/list']);
        }
      })
    }
  }

}
