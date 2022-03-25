import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { debounceTime } from 'rxjs/operators';
import * as $ from "jquery";
import { ApiService } from '../_helper/api/api.service';
declare var document: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  topThreeEmp : Array<any> = [];
  topTwentyEmp : Array<any> = [];
  totalEmp : Array<any> = [];
  emp : Array<any> = [];
  year1:any;
  year2:any;
  constructor(public title: Title, public apiS: ApiService) {
    title.setTitle("Dashboard | Swadchai");
  }

  ngOnInit(): void {
    var today = new Date();
    
    var curMonth = today.getMonth();
    if (curMonth > 3) { 
       this.year1 = today.getFullYear().toString().charAt(2) + ""+ today.getFullYear().toString().charAt(3);
        this.year2 = (today.getFullYear() + 1).toString().charAt(2)+""+ (today.getFullYear() + 1).toString().charAt(3);
    } else {
      this.year1 =(today.getFullYear() - 1).toString().charAt(2)+""+(today.getFullYear() - 1).toString().charAt(3);
      this.year2=  today.getFullYear().toString().charAt(2)+""+today.getFullYear().toString().charAt(2);
    }
    this.getAllEmpPerformace();
    this.apiS.getFiscalYrSales().subscribe((data: any)=>{
      console.log(data)
      var mixedChart = new Chart('myChartCombo', {
        type: 'bar',
        data: {
          datasets: [{
            label: 'Total Sales (kg)',
            data: [data.april, data.may, data.june, data.july, data.august, data.september, data.october,data.november, data.december,data.january, data.february,data.march],
            order: 2,
            fill: true,
            barThickness:30,
            backgroundColor: ['#ffbc2c', '#ffbc2c', '#ffbc2c', '#ffbc2c', '#ffbc2c', '#ffbc2c', '#ffbc2c', '#ffbc2c','#ffbc2c','#ffbc2c','#ffbc2c','#ffbc2c']
          }
          // , {
          //   label: 'Average Sales',
          //   data: [180],
          //   order: 2,
          //   fill: true,
          //   barThickness:30,
          //   backgroundColor: ['#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af']
          // }
        ],
          labels: ['Apr '+this.year1,'May '+this.year1,'June '+this.year1,'July '+this.year1,
          'Aug '+this.year1,'Sept '+this.year1,'Oct '+this.year1,'Nov '+this.year1
          ,'Dec '+this.year1,'Jan '+this.year2,'Feb '+this.year2,'Mar '+this.year2]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
  
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true,
              display: true,
              ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true   // minimum value will be 0.
              }
            }]
          }
        }
      });
    })
    this.apiS.getAdminDashboardPie().subscribe(data=>{
      var xValues = ["Dust", "Leaf", "Elaichi"];
      var yValues = [data.brand[0].sizeBrand1, data.brand[0].sizeBrand2, data.brand[0].sizeBrand3];
      var barColors = [
        "#7F00FF",
        "#ffa500",
        "#26D701"
      ];
  
      new Chart("myChart", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          
        }
      });
    });
    
    

  }

  getAllEmpPerformace(){
    this.apiS.getAllEmpPerformace().subscribe((data)=>{
      console.log(data);
      this.emp = data.data;
      this.totalEmp = this.emp;
      let count = 0;
      data.data.forEach((element: any) => {
        if(count < 3){
          this.topThreeEmp.push({ ...element});
        }
        if(count < 20){
          this.topTwentyEmp.push({ ...element});
        }
        count++;
      });
    });
  }

  initializeItems(){
    this.totalEmp = this.emp;
  }

  getFilter(ev: any) {
    this.initializeItems();
    console.log(ev.target.value)
     const val = ev.target.value;
     if (!val) {
       return;
     }
     this.totalEmp = this.totalEmp.filter((currentGoal:any) => {
       if (currentGoal.data.userData[0].name && val) {
         if (currentGoal.data.userData[0].name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
           return true;
         }else{
           return false;
         }
         return false;
       }else{
         return true;
       }
     });
   }

}
