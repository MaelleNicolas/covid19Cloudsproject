import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Covid19Service } from '../covid19.service';
import { CovidCountriesAll } from '../covidCountriesAll.model';
import { CovidSummary } from '../covidSummary.model';

@Component({
  selector: 'app-specific-summary',
  templateUrl: './specific-summary.component.html',
  styleUrls: ['./specific-summary.component.css']
})
export class SpecificSummaryComponent implements OnInit {
  slug : string ;
  name : string ;
  covidCountrySpecific : CovidSummary ;
  constructor(private router : Router, private covid19Service : Covid19Service) { }

  ngOnInit(): void {
    var n= this.router.url.toString().split('/').length ;
    this.slug= this.router.url.toString().split('/')[n-1] ;
    this.covid19Service.getCountries().subscribe((covidCountriesAll : CovidCountriesAll[])=>{
      covidCountriesAll.forEach((covidCountrySpecific : CovidCountriesAll) => {
        if (covidCountrySpecific.Slug==this.slug) {
          this.covidCountrySpecific={
            totalCases :covidCountrySpecific.TotalConfirmed,
            newCases : covidCountrySpecific.NewConfirmed ,
            activeCases: covidCountrySpecific.TotalConfirmed-covidCountrySpecific.TotalRecovered-covidCountrySpecific.TotalDeaths , 
            totalRecovered: covidCountrySpecific.TotalRecovered ,
            newRecovered: covidCountrySpecific.TotalRecovered ,
            recoveryRate :  Math.round((covidCountrySpecific.TotalRecovered/covidCountrySpecific.TotalConfirmed) *10000)/100,
            totalDeaths : covidCountrySpecific.TotalDeaths ,
            newDeaths: covidCountrySpecific.NewDeaths ,
            mortalityRate: Math.round((covidCountrySpecific.TotalDeaths/covidCountrySpecific.TotalConfirmed)*10000)/100 ,
            date: new Date() 

          }
          this.name=covidCountrySpecific.Country
        }
      }
    )


  })
}
}

