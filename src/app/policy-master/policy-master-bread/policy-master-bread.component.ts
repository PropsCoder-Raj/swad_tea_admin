import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_helper/api/api.service';

@Component({
  selector: 'app-policy-master-bread',
  templateUrl: './policy-master-bread.component.html',
  styleUrls: ['./policy-master-bread.component.scss']
})
export class PolicyMasterBreadComponent implements OnInit {

  breadStatus = true;
  edit = false;
  editId = '';

  salesTeamIncentive = 0;
  salesTeamTarget = 0;
  birthDayOfferIncentive = 0;
  retailerIncentive = 0;
  retailerTarget = 0;
  retailerFreeTEA = 0;
  retailerBirthDayOfferIncentive = 0;

  constructor(public route: ActivatedRoute, public title: Title, public toastr: ToastrService, public apiS : ApiService, public router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: any)=>{
      if(data.action == "create"){
        this.edit = false;
        this.title.setTitle("Create Policy | Swadchai");
      }else{
        this.edit = true;
        this.title.setTitle("Update Policy | Swadchai");
        this.route.queryParams.subscribe((params: any) =>{
          this.editId = params.id;
          this.apiS.getSinglePolicyMaster(this.editId).subscribe((response: any) => {
            this.salesTeamIncentive = response.data[0].salesTeamIncentive;
            this.salesTeamTarget = response.data[0].salesTeamTarget;
            this.birthDayOfferIncentive = response.data[0].birthDayOfferIncentive;
            this.retailerIncentive = response.data[0].retailerIncentive;
            this.retailerTarget = response.data[0].retailerTarget;
            this.retailerFreeTEA = response.data[0].retailerFreeTEA;
            this.retailerBirthDayOfferIncentive = response.data[0].retailerBirthDayOfferIncentive;
          });
        })
      }  
    });  
  }

  submit(){
    if(this.salesTeamIncentive === null || this.salesTeamIncentive === 0 || this.salesTeamIncentive === undefined){
      this.toastr.error("Please Enter Sales Team Incentive");
      return;
    }

    if(this.salesTeamTarget === null || this.salesTeamTarget === 0 || this.salesTeamTarget === undefined){
      this.toastr.error("Please Enter Sales Team Target");
      return;
    }

    if(this.birthDayOfferIncentive === null || this.birthDayOfferIncentive === 0 || this.birthDayOfferIncentive === undefined){
      this.toastr.error("Please Enter BirthDay Offer Incentive");
      return;
    }

    if(this.retailerIncentive === null || this.retailerIncentive === 0 || this.retailerIncentive === undefined){
      this.toastr.error("Please Enter Retailer Incentive");
      return;
    }

    if(this.retailerTarget === null || this.retailerTarget === 0 || this.retailerTarget === undefined){
      this.toastr.error("Please Enter Retailer Target");
      return;
    }

    if(this.retailerFreeTEA === null || this.retailerFreeTEA === 0 || this.retailerFreeTEA === undefined){
      this.toastr.error("Please Enter Retailer Free TEA");
      return;
    }

    if(this.retailerBirthDayOfferIncentive === null || this.retailerBirthDayOfferIncentive === 0 || this.retailerBirthDayOfferIncentive === undefined){
      this.toastr.error("Please Enter Retailer BirthDay Offer Incentive");
      return;
    }

    if(this.edit != false){
      this.apiS.updatePolicyMaster(this.salesTeamIncentive, this.salesTeamTarget, this.birthDayOfferIncentive, this.retailerIncentive, this.retailerTarget, this.retailerFreeTEA, this.retailerBirthDayOfferIncentive, this.editId).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/policy-master/list']);
        }
      })
    }else{
      this.apiS.createPolicyMaster(this.salesTeamIncentive, this.salesTeamTarget, this.birthDayOfferIncentive, this.retailerIncentive, this.retailerTarget, this.retailerFreeTEA, this.retailerBirthDayOfferIncentive).subscribe(response=>{
        if(response.status === 'success'){
          this.toastr.success(response.message);
          this.router.navigate(['/policy-master/list']);
        }
      })
    }
  }

}
