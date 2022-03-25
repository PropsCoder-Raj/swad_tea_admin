import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';

@Component({
  selector: 'app-trasport-master-bread',
  templateUrl: './trasport-master-bread.component.html',
  styleUrls: ['./trasport-master-bread.component.scss']
})
export class TrasportMasterBreadComponent implements OnInit {

  
  breadStatus = true;
  edit = false;
  editId = '';

  transporterName = '';
  contactPersonName = '';
  gstTransporterId = '';
  mobile = 0;
  address = '';

  constructor(public route: ActivatedRoute, public title: Title, public toastr: ToastrService, public apiS : ApiService, public router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: any)=>{
      if(data.action == "create"){
        this.edit = false;
        this.title.setTitle("Create Transport | Swadchai");
      }else{
        this.edit = true;
        this.title.setTitle("Update Transport | Swadchai");
        this.route.queryParams.subscribe((params: any) =>{
          this.editId = params.id;
          this.apiS.getSingleTransport(this.editId).subscribe((response: any) => {
            this.transporterName = response.data[0].transporterName;
            this.contactPersonName = response.data[0].contactPersonName;
            this.gstTransporterId = response.data[0].gstTransporterId;
            this.mobile = response.data[0].mobile;
            this.address = response.data[0].address;
          });
        })
      }  
    });  
  }

  submit(){
    if(this.transporterName === null || this.transporterName === '' || this.transporterName === undefined){
      this.toastr.error("Please Enter Transporter Name");
      return;
    }

    if(this.contactPersonName === null || this.contactPersonName === '' || this.contactPersonName === undefined){
      this.toastr.error("Please Enter Contact Person Name");
      return;
    }

    if(this.gstTransporterId === null || this.gstTransporterId === '' || this.gstTransporterId === undefined){
      this.toastr.error("Please Enter GST Transporter Name");
      return;
    }

    if(this.mobile === null || this.mobile === 0 || this.mobile === undefined){
      this.toastr.error("Please Enter Mobile");
      return;
    }


    let mobileStr = new String(this.mobile);
    if(mobileStr.length !== 10){
      this.toastr.error("Please Enter 10 Digit Mobile Number.");
      return;
    }

    if(this.address === null || this.address === '' || this.address === undefined){
      this.toastr.error("Please Enter Address");
      return;
    }

    if(this.edit != false){
      this.apiS.updateTransport(this.transporterName, this.contactPersonName, this.gstTransporterId, this.mobile, this.address, this.editId).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/transport-master/list']);
        }
      })
    }else{
      this.apiS.createTransport(this.transporterName, this.contactPersonName, this.gstTransporterId, this.mobile, this.address).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/transport-master/list']);
        }
      })
    }
  }

}
