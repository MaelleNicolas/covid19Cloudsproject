import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as moment from 'moment';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective, Label } from 'ng2-charts';
import { Covid19Service } from '../covid19.service';
import { CovidDaily } from '../covidDaily.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
})
export class DailyComponent implements OnInit {
  covidDaily : CovidDaily[] ;
  constructor(public covid19Service: Covid19Service) { }

  

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  //public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Daily Deaths' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Daiy Recovered' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Daiy New Cases' }
  ];
  

  


 

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
   
      
  }

  ngOnInit(): void {
    this.covid19Service.getDaily().subscribe((covidDaily : CovidDaily[])=>{
      this.covidDaily=covidDaily;
      if (this.covidDaily.length>100){
      this.covidDaily.sort(function(a,b){ return a.TotalConfirmed - b.TotalConfirmed});  
      console.log(this.covidDaily); 
      var n= this.covidDaily.length;
      console.log(n) ;
      for (let j=0; j<7; j++){
        
          this.barChartData[0].data[j]=this.covidDaily[n-8+j].NewDeaths;
          this.barChartData[1].data[j]=this.covidDaily[n-8+j].NewRecovered;
          this.barChartData[2].data[j]=this.covidDaily[n-8+j].NewConfirmed;
          this.barChartLabels[j]=moment().subtract('days', 6-j).format('MMM Do');
          console.log(this.barChartData)
      } 
      
     
    console.log(this.barChartData);
    console.log(this.barChartLabels)
      }
      })
    


}
}
