import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../covid19.service';
import { CovidSummary } from '../covidSummary.model';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  covidSummary : CovidSummary ;
  constructor(public covid19Service: Covid19Service) {}

  ngOnInit(): void {
    this.covid19Service.getSummary().subscribe((summary)=>{
      this.covidSummary= {
        totalCases :summary['totalCases'] ,
        newCases : summary['newCases'] ,
        activeCases: summary['activeCases'] , 
        totalRecovered: summary['totalRecovered'] ,
        newRecovered: summary['newRecovered'] ,
        recoveryRate :  summary['recoveryRate'] ,
        totalDeaths : summary['totalDeaths'] ,
        newDeaths: summary['newDeaths'] ,
        mortalityRate: summary['mortalityRate'] ,
        date: new Date(summary['date']) 
     
     }
     
    }

    )

  }

}

