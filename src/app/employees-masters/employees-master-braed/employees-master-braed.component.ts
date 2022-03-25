import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';
import { UserService } from 'src/app/_helper/user/user.service';
import { environment } from 'src/environments/environment';
import { Location } from "../location";

@Component({
  selector: 'app-employees-master-braed',
  templateUrl: './employees-master-braed.component.html',
  styleUrls: ['./employees-master-braed.component.scss']
})
export class EmployeesMasterBraedComponent implements OnInit {

  breadStatus = true;
  edit = false;
  editId = '';
  myLocation : any = new Location();
  designationList: Array<any> = [];

  anniversaryDate = '';
  dateOfJoning = '';
  designation = '';
  reportingTo = '';
  alloatedArea: Array<any> = [];
  blackoutArea: Array<any> = [];
  remark = '';
  targetInKg = '';
  incentive = '';
  name = '';
  email = '';
  password = '';
  userId = '';
  address = '';
  aadharCard = '';
  state = '';
  city = '';
  mobileNo = '';
  areaOfExpertise = '';
  gender = '';
  birthDate = '';
  referenceDetails = '';
  status = '';
  document = { url: "", type: ""};
  photo = { url: "", type: ""};
  _uid = '';
  employeeList: Array<any> = [];
  areaMasterListAllocated: Array<any> = [];
  areaMasterListBlackout: Array<any> = [];
  
  
  baseURL = environment.baseURL;
  dropdownList: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings = {};
  @ViewChild('selectNg') SelectorNgRef: any;

  addressEditor !: Editor;
  referenceDetailsEditor !: Editor;
  remarkEditor !: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
  ];

  constructor(public route: ActivatedRoute, public title: Title, public apiS: ApiService, public toastr: ToastrService, public router: Router, public userS: UserService) { }

  ngOnInit(): void {
    this.addressEditor = new Editor();
    this.referenceDetailsEditor = new Editor();
    this.remarkEditor = new Editor();
    this.apiS.getAllDesignation().subscribe(response=>{
      this.designationList = response.data;
    })
    this.apiS.getAllAreaMaster().subscribe(data=>{
      data.data.forEach((element: any)=>{
        this.areaMasterListAllocated.push({name: element.areaName, checked : false, status: element.status,});
        this.areaMasterListBlackout.push({name: element.areaName, checked : false, status: element.status,});
      })
    });  
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
        this.title.setTitle("Create Employees | Swadchai");
      }else{
        this.edit = true;
        this.title.setTitle("Update Employees | Swadchai");
        this.route.queryParams.subscribe((params: any) =>{
          this.editId = params.id;
          this.apiS.getSingleEmployeeMaster(this.editId).subscribe((response: any) => {
            this.state = response.data[0].state;
            this.anniversaryDate = response.data[0].anniversaryDate;
            this.dateOfJoning = response.data[0].dateOfJoning;
            this.designation = response.data[0].designation;
            this.reportingTo = response.data[0].reportingTo;
            this.remark = response.data[0].remark;
            this.targetInKg = response.data[0].targetInKg;
            this.incentive = response.data[0].incentive;
            this.referenceDetails = response.data[0].referenceDetails;
            this.status = response.data[0].status;
            this.document = response.data[0].document;
            this.photo = response.data[0].photo;
            this._uid = response.data[0].user;
            this.alloatedArea =response.data[0].alloatedArea;
            this.blackoutArea =response.data[0].blackoutArea;

            this.userS.getSingleUser(this._uid).subscribe((user) => {
              this.name = user.data.name;
              this.email = user.data.email;
              this.password = user.data.password;
              this.userId = user.data.userId;
              this.address = user.data.address;
              this.aadharCard = user.data.aadharCard;
              this.state = user.data.state;
              this.status = user.data.status;
              this.city = user.data.city;
              this.mobileNo = user.data.mobileNo;
              this.areaOfExpertise = user.data.areaOfExpertise;
              this.gender = user.data.gender;
              this.birthDate = user.data.birthDate;
            })
          });
        })
      }  
    });  
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
    console.log(this.selectedItems);
  }

  ngOnDestroy() {
    this.addressEditor.destroy();
    this.referenceDetailsEditor.destroy();
    this.remarkEditor.destroy();
  }

  readURLDoc(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let fileData: FormData = new FormData();
      fileData.append('file', event.target.files[0]);
      this.apiS.uploadFile(fileData).subscribe(res => {
        console.log(res);
        if (res.data) {
          this.document.url = res.data.url;
          this.document.type = 'image';
        }
      });
    }
  }
  

  readURLPhoto(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let fileData: FormData = new FormData();
      fileData.append('file', event.target.files[0]);
      this.apiS.uploadFile(fileData).subscribe(res => {
        console.log(res);
        if (res.data) {
          this.photo.url = res.data.url;
          this.photo.type = 'image';
        }
      });
    }
  }

  submit(){

    if(this.name === null || this.name === '' || this.name === undefined){
      this.toastr.error("Please Enter Name");
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

    if(this.state === null || this.state === '' || this.state === undefined){
      this.toastr.error("Please Select State");
      return;
    }

    if(this.city === null || this.city === '' || this.city === undefined){
      this.toastr.error("Please Select City");
      return;
    }

    if(this.mobileNo === null || this.mobileNo === '' || this.mobileNo === undefined){
      this.toastr.error("Please Enter Mobile No");
      return;
    }

    if(this.mobileNo.length !== 10){
      this.toastr.error("Please Enter 10 Digit Mobile Number.");
      return;
    }

    if(this.areaOfExpertise === null || this.areaOfExpertise === '' || this.areaOfExpertise === undefined){
      this.toastr.error("Please Enter Area Of Expertise");
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

    // if(this.anniversaryDate === null || this.anniversaryDate === '' || this.anniversaryDate === undefined){
    //   this.toastr.error("Please Select Anniversary Birth Date");
    //   return;
    // }

    if(this.referenceDetails === null || this.referenceDetails === '' || this.referenceDetails === undefined){
      this.toastr.error("Please Enter Reference Details");
      return;
    }

    if(this.dateOfJoning === null || this.dateOfJoning === '' || this.dateOfJoning === undefined){
      this.toastr.error("Please Select Date Of Joning");
      return;
    }

    if(this.designation === null || this.designation === '' || this.designation === undefined){
      this.toastr.error("Please Select Designation");
      return;
    }

    // if(this.reportingTo === null || this.reportingTo === '' || this.reportingTo === undefined){
    //   this.toastr.error("Please Enter Reporting To");
    //   return;
    // }

    // if(this.remark === null || this.remark === '' || this.remark === undefined){
    //   this.toastr.error("Please Enter Remark");
    //   return;
    // }

    if(this.targetInKg === null || this.targetInKg === '' || this.targetInKg === undefined){
      this.toastr.error("Please Enter Target In Kg");
      return;
    }

    if(this.incentive === null || this.incentive === '' || this.incentive === undefined){
      this.toastr.error("Please Enter Incentive");
      return;
    }

    // if(this.alloatedArea === null || this.alloatedArea === [] || this.alloatedArea === undefined){
    //   this.toastr.error("Please Select Alloated Area");
    //   return;
    // }

    // if(this.blackoutArea === null || this.blackoutArea === [] || this.blackoutArea === undefined){
    //   this.toastr.error("Please Select Blackout Area");
    //   return;
    // }

    if(this.document.url === null || this.document.url === '' || this.document.url === undefined){
      this.toastr.error("Please Upload Document");
      return;
    }

    if(this.photo.url === null || this.photo.url === '' || this.photo.url === undefined){
      this.toastr.error("Please Upload Photo");
      return;
    }

    if(this.status === null || this.status === '' || this.status === undefined){
      this.toastr.error("Please Select Status");
      return;
    }

    if(this.edit != false){
      this.apiS.updateEmployeeMaster(this.anniversaryDate , this.dateOfJoning , this.designation , this.reportingTo , this.alloatedArea , this.blackoutArea , this.remark , this.targetInKg , this.incentive , this.name , this.email , this._uid , this.userId , this.address , this.state , this.city , this.mobileNo , this.areaOfExpertise , this.gender , this.birthDate , this.referenceDetails, this.aadharCard, this.status , this.document, this.photo, this.editId).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/employees-masters/list']);
        }
      })
    }else{
      this.apiS.createEmployeeMaster(this.anniversaryDate, this.dateOfJoning, this.designation, this.reportingTo, this.alloatedArea, this.blackoutArea, this.remark, this.targetInKg, this.incentive, this.name, this.email, this.password, this.userId, this.address, this.state, this.city, this.mobileNo, this.areaOfExpertise, this.gender, this.birthDate, this.referenceDetails, this.aadharCard, this.status, this.document, this.photo).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/employees-masters/list']);
        }
      })
    }
  }

}
