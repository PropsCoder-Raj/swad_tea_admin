import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';
import { UserService } from 'src/app/_helper/user/user.service';
import { environment } from 'src/environments/environment';
import { Location } from "../location";

@Component({
  selector: 'app-retailers-masters-bread',
  templateUrl: './retailers-masters-bread.component.html',
  styleUrls: ['./retailers-masters-bread.component.scss']
})
export class RetailersMastersBreadComponent implements OnInit {

  breadStatus = true;
  edit = false;

  accountManager = '';
  srAccountManager = '';
  anniversaryDate = '';
  firmName = '';
  gstinNo = '';
  fssailicNo = '';
  potentialSale = '';
  target = '';
  incentive = '';
  discount = '';
  referenceDetails = '';
  document: any = { url: "", type: ""};
  selfi: any = { url: "", type: ""};
  photo: any = { url: "", type: ""};
  documentURL = '';
  selfiURL = '';
  photoURL = '';
  email = '';
  password = '';
  userId = '';
  address = '';
  district = '';
  taluka = '';
  contactPersonName = '';
  state = '';
  city = '';
  mobileNo = '';
  whatsappNo = '';
  gender = '';
  birthDate = '';
  aadharCard = '';
  status = '';
  editId = '';
  baseURL = environment.baseURL;

  _uid = '';
  addressEditor !: Editor;
  referenceDetailsEditor !: Editor;
  remarkEditor !: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
  ];
  passwordS:boolean=false;

  myLocation : any = new Location();
  employeeList: Array<any> = [];

  constructor(public route: ActivatedRoute,public title: Title, public toastr: ToastrService, public apiS : ApiService, public router: Router, public userS: UserService) { }

  ngOnInit(): void {
    this.addressEditor = new Editor();
    this.referenceDetailsEditor = new Editor();
    this.remarkEditor = new Editor();
    this.apiS.getAllEmployeeMaster().subscribe(data=>{
      if(data.data.length > 0){
        let myPromise = new Promise<any>((resolve: any, reject: any) =>{
          data.data.forEach((element: any, index: any, array: any)=>{
            this.userS.getSingleUser(element.user).subscribe(response=>{
              this.apiS.getSingleDesignation(element.designation).subscribe(responseD=>{
                this.employeeList.push({...element, ...response.data, _destination: responseD.data[0]['designation'], empId: element['_id']});
                if(index === array.length -1) resolve()
              });  
            });
          })
        });
      }
    });
    this.route.params.subscribe((data: any)=>{
      if(data.action == "create"){
        this.edit = false;
        this.title.setTitle("Create Retailers | Swadchai");
      }else{
        this.edit = true;
        this.title.setTitle("Update Retailers | Swadchai");

        this.route.queryParams.subscribe((params: any) =>{
          this.editId = params.id;
          this.apiS.getSingleRetailerMaster(this.editId).subscribe((response: any) => {
            this.accountManager = response.data[0].accountManager;
            this.srAccountManager = response.data[0].srAccountManager;
            this.anniversaryDate = response.data[0].anniversaryDate;
            this.firmName = response.data[0].firmName;
            this.gstinNo = response.data[0].gstinNo;
            this.fssailicNo = response.data[0].fssailicNo;
            this.potentialSale = response.data[0].potentialSale;
            this.target = response.data[0].target;
            this.incentive = response.data[0].incentive;
            this.discount = response.data[0].discount;
            this.referenceDetails = response.data[0].referenceDetails;
            this.documentURL = response.data[0].document.url;
            this.selfiURL = response.data[0].selfi.url;
            this.photoURL = response.data[0].photo.url;
            this.state = response.data[0].state;
            this._uid = response.data[0].user;

            this.userS.getSingleUser(this._uid).subscribe((user) => {
              this.email = user.data.email;
              this.password = user.data.password;
              if(this.password == undefined){
                this.passwordS = true;
              }else{
                this.passwordS = false;
              }
              this.userId = user.data.userId;
              this.address = user.data.address;
              this.district = user.data.district;
              this.taluka = user.data.taluka;
              this.contactPersonName = user.data.contactPersonName;
              this.state = user.data.state;
              this.city = user.data.city;
              this.mobileNo = user.data.mobileNo;
              this.whatsappNo = user.data.whatsappNo;
              this.gender = user.data.gender;
              this.birthDate = user.data.birthDate;
              this.aadharCard = user.data.aadharCard;
              this.status = user.data.status;
            })
          });
        })
      }  
    });  
  }

  ngOnDestroy() {
    this.addressEditor.destroy();
    this.referenceDetailsEditor.destroy();
    this.remarkEditor.destroy();
  }

  onchangeSelect(){
    this.city = this.district;
  }

  readURLDoc(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let fileData: FormData = new FormData();
      fileData.append('file', event.target.files[0]);
      this.apiS.uploadFile(fileData).subscribe(res => {
        if (res.data) {
          this.documentURL = res.data.url;
        }
      });
    }
  }
  

  readURLPhoto(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let fileData: FormData = new FormData();
      fileData.append('file', event.target.files[0]);
      this.apiS.uploadFile(fileData).subscribe(res => {
        if (res.data) {
          this.photoURL = res.data.url;
        }
      });
    }
  }
  

  readURLSelfi(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let fileData: FormData = new FormData();
      fileData.append('file', event.target.files[0]);
      this.apiS.uploadFile(fileData).subscribe(res => {
        if (res.data) {
          this.selfiURL = res.data.url;
        }
      });
    }
  }

  submit(){

    this.document.url = this.documentURL;
    this.document.type = 'image';

    this.photo.url = this.photoURL;
    this.photo.type = 'image';

    this.selfi.url = this.selfiURL;
    this.selfi.type = 'image';

    if(this.firmName === null || this.firmName === '' || this.firmName === undefined){
      this.toastr.error("Please Enter Firm Name");
      return;
    }

    if(this.aadharCard === null || this.aadharCard === '' || this.aadharCard === undefined){
      this.toastr.error("Please Enter Aadhar Card");
      return;
    }

    if(this.email === null || this.email === '' || this.email === undefined){
      this.toastr.error("Please Enter Email");
      return;
    }
    
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.email) == false) {
      this.toastr.error("Please! Enter valid email.");
      return;
    }

    if(this.password === null || this.password === '' || this.password === undefined){
      this.toastr.error("Please Enter Password");
      return;
    }

    if(this.userId === null || this.userId === '' || this.userId === undefined){
      this.toastr.error("Please Enter User Id");
      return;
    }

    if(this.address === null || this.address === '' || this.address === undefined){
      this.toastr.error("Please Enter Address");
      return;
    }

    if(this.district === null || this.district === '' || this.district === undefined){
      this.toastr.error("Please Select District");
      return;
    }

    if(this.state === null || this.state === '' || this.state === undefined){
      this.toastr.error("Please Select State");
      return;
    }

    if(this.city === null || this.city === '' || this.city === undefined){
      this.toastr.error("Please Select City");
      return;
    }
    
    if(this.city === "Pune"){
      if(this.taluka === null || this.taluka === '' || this.taluka === undefined){
        this.toastr.error("Please Select Taluka");
        return;
      }
    }



    if(this.mobileNo === null || this.mobileNo === '' || this.mobileNo === undefined){
      this.toastr.error("Please Enter Mobile No");
      return;
    }
    
    if(this.mobileNo.length !== 10){
      this.toastr.error("Please Enter 10 Digit Mobile Number.");
      return;
    }

    if(this.whatsappNo === null || this.whatsappNo === '' || this.whatsappNo === undefined){
      this.toastr.error("Please Enter Whatsapp No");
      return;
    }

    if(this.gender === null || this.gender === '' || this.gender === undefined){
      this.toastr.error("Please Select Gender");
      return;
    }

    if(this.birthDate === null || this.birthDate === '' || this.birthDate === undefined){
      this.toastr.error("Please Select Birth Date");
      return;
    }

    // if(this.discount === null || this.discount === '' || this.discount === undefined){
    //   this.toastr.error("Please Enter Discount");
    //   return;
    // }

    // if(this.anniversaryDate === null || this.anniversaryDate === '' || this.anniversaryDate === undefined){
    //   this.toastr.error("Please Select Anniversary Birth Date");
    //   return;
    // }

    // if(this.referenceDetails === null || this.referenceDetails === '' || this.referenceDetails === undefined){
    //   this.toastr.error("Please Enter Reference Details");
    //   return;
    // }

    if(this.gstinNo === null || this.gstinNo === '' || this.gstinNo === undefined){
      this.toastr.error("Please Enter GSTIN No");
      return;
    }

    if(this.fssailicNo === null || this.fssailicNo === '' || this.fssailicNo === undefined){
      this.toastr.error("Please Enter FSSAI LIC No");
      return;
    }

    if(this.potentialSale === null || this.potentialSale === '' || this.potentialSale === undefined){
      this.toastr.error("Please Enter Potential Sale");
      return;
    }

    if(this.srAccountManager === null || this.srAccountManager === '' || this.srAccountManager === undefined){
      this.toastr.error("Please Select Sr Account Manager");
      return;
    }

    if(this.accountManager === null || this.accountManager === '' || this.accountManager === undefined){
      this.toastr.error("Please Select Account Manager");
      return;
    }

    if(this.contactPersonName === null || this.contactPersonName === '' || this.contactPersonName === undefined){
      this.toastr.error("Please Enter Contact Person Name");
      return;
    }

    // if(this.incentive === null || this.incentive === '' || this.incentive === undefined){
    //   this.toastr.error("Please Enter Incentive");
    //   return;
    // }

    if(this.target === null || this.target === '' || this.target === undefined){
      this.toastr.error("Please Enter Target in KG");
      return;
    }

    if(this.document.url === null || this.document.url === '' || this.document.url === undefined){
      this.toastr.error("Please Upload Document");
      return;
    }

    if(this.photo.url === null || this.photo.url === '' || this.photo.url === undefined){
      this.toastr.error("Please Upload Photo");
      return;
    }
    
    if(this.selfi.url === null || this.selfi.url === '' || this.selfi.url === undefined){
      this.toastr.error("Please Upload Selfi");
      return;
    }

    if(this.status === null || this.status === '' || this.status === undefined){
      this.toastr.error("Please Select Status");
      return;
    }

    if(this.edit != false){
      this.apiS.updateRetailerMaster(this.accountManager, this.srAccountManager, this.anniversaryDate, this.firmName, this.gstinNo, this.fssailicNo, this.potentialSale, this.target, this.incentive, this.discount,  this.email, this.password, this.userId, this.address, this.state, this.city, this.mobileNo, this.gender, this.birthDate, this.referenceDetails, this.aadharCard, this.status, this.document, this.photo, this.selfi, this.district, this.taluka, this.contactPersonName, this.whatsappNo, this._uid, this.editId).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/retailers-masters/list']);
        }
      })
    }else{
      this.apiS.createRetailerMaster(this.accountManager, this.srAccountManager, this.anniversaryDate, this.firmName, this.gstinNo, this.fssailicNo, this.potentialSale, this.target, this.incentive, this.discount,  this.email, this.password, this.userId, this.address, this.state, this.city, this.mobileNo, this.gender, this.birthDate, this.referenceDetails, this.aadharCard, this.status, this.document, this.photo, this.selfi, this.district, this.taluka, this.contactPersonName, this.whatsappNo).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/retailers-masters/list']);
        }
      })
    }
  }

}
