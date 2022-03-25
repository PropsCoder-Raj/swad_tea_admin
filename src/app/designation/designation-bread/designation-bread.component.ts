import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';

@Component({
  selector: 'app-designation-bread',
  templateUrl: './designation-bread.component.html',
  styleUrls: ['./designation-bread.component.scss']
})
export class DesignationBreadComponent implements OnInit {

  breadStatus = true;
  edit = false;

  designation = '';
  status = '';
  editId = '';

  constructor(public route: ActivatedRoute, public title: Title, public apiS: ApiService, public toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: any)=>{
      if(data.action == "create"){
        this.edit = false;
        this.title.setTitle("Create Designation | Swadchai");
      }else{
        this.edit = true;
        this.title.setTitle("Update Designation | Swadchai");
        this.route.queryParams.subscribe((params: any) =>{
          this.editId = params.id;
          this.apiS.getSingleDesignation(this.editId).subscribe((response: any) => {
            this.designation = response.data[0].designation;
            this.status = response.data[0].status;
          });
        })
      }  
    });  
  }

  submit(){
    if(this.designation === null || this.designation === '' || this.designation === undefined){
      this.toastr.error("Please Enter Designation");
      return;
    }

    if(this.status === null || this.status === '' || this.status === undefined){
      this.toastr.error("Please Select Status");
      return;
    }

    if(this.edit != false){
      this.apiS.updateDesignation(this.designation, this.status, this.editId).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/designation/list']);
        }
      })
    }else{
      this.apiS.createDesignation(this.designation, this.status).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/designation/list']);
        }
      })
    }
  }

}
