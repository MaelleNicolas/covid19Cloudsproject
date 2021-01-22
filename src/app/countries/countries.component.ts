import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Covid19Service } from '../covid19.service';
import { CovidCountriesAll } from '../covidCountriesAll.model';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  covidCountriesAll : CovidCountriesAll[] ;
  constructor(public covid19Service: Covid19Service, public router:Router) {}

  
 
  ngOnInit(): void {
    this.covid19Service.getCountries().subscribe((covidCountriesAll : CovidCountriesAll[])=>{
      this.covidCountriesAll=covidCountriesAll;
    })
  }


  public specificCountryData(slug : string){
    this.router.navigate(["specificCountry/"+slug]) ;
    this.covid19Service.apiRequestSpecificDaily(slug) ;
    console.log("navigate to specific country" + slug) ;
  }
}
