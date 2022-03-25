import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss']
})
export class LocalisationComponent implements OnInit {

  stateBreadStatus = 0;
  districtBreadStatus = 0;
  cityBreadStatus = 0;
  marketBreadStatus = 0;

  constructor(public title: Title) {
    title.setTitle("Localisation | Swadchai");
  }

  ngOnInit(): void {
  }

}
