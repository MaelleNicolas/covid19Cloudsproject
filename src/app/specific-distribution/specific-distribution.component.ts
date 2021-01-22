import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Covid19Service } from '../covid19.service';
import { CovidCountriesAll } from '../covidCountriesAll.model';
import { CovidSummary } from '../covidSummary.model';

@Component({
  selector: 'app-specific-distribution',
  templateUrl: './specific-distribution.component.html',
  styleUrls: ['./specific-distribution.component.css']
})
export class SpecificDistributionComponent implements OnInit {
  slug : string ;
  name : string ;
  covidCountrySpecific : CovidSummary ;
  constructor(public covid19Service: Covid19Service,private router : Router) { }
 
  // Pie 
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  
  public pieChartLabels: Label[] = [['Dead Casses'], ['Recovered Cases'], 'Active Cases'];
  public pieChartData: number[] = [50, 50, 50];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  //public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(137,196,244,1)', 'rgba(255,246,143,1)'],
    },
  ];

  ngOnInit(): void {
    var n= this.router.url.toString().split('/').length ;
    this.slug= this.router.url.toString().split('/')[n-1] ;
    this.covid19Service.getCountries().subscribe((covidCountriesAll : CovidCountriesAll[])=>{
      covidCountriesAll.forEach((covidCountrySpecific : CovidCountriesAll) => {
        if (covidCountrySpecific.Slug==this.slug) {
          this.pieChartData=[
            covidCountrySpecific.TotalDeaths,
            covidCountrySpecific.TotalRecovered,
            covidCountrySpecific.TotalConfirmed-covidCountrySpecific.TotalDeaths-covidCountrySpecific.TotalRecovered,
          ];
         this.name=covidCountrySpecific.Country;
        } ;

      }
    )
    })
  }
    
 
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  }

  


}
