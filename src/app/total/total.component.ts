import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
//import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import * as moment from 'moment';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Covid19Service } from '../covid19.service';
import { CovidDaily } from '../covidDaily.model';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit {
  covidDaily: CovidDaily[];
  lineChartLabels: Label[] = [];
  


  public lineChartData: ChartDataSets[] = [
    { data: [10, 10, 10, 10, 10, 10, 10], label: 'Total Deaths' },
    { data: [10, 10, 10, 10, 10, 10, 10], label: 'Total Recovered' },
    { data: [10, 10, 10, 10, 10, 10, 10], label: 'Total Cases' }
  ];
  lineChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false,
      },
    }
  };

  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(255,0,0,0.3)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,0,0,0.3)'
    },
    {
      backgroundColor: 'rgba(137,196,244,1)',
      borderColor: 'rgba(137,196,244,1)',
      pointBackgroundColor: 'rgba(137,196,244,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(137,196,244,1)'
    },
    {
      backgroundColor: 'rgba(255,246,143,1)',
      borderColor: 'rgba(255,246,143,1)',
      pointBackgroundColor: 'rgba(255,246,143,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,246,143,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


  constructor(public covid19Service: Covid19Service) { }


  

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

 

  

  


  ngOnInit(): void {
    this.covid19Service.getDaily().subscribe((covidDaily: CovidDaily[]) => {
      this.covidDaily = covidDaily;
      if (this.covidDaily.length > 100) {
        this.covidDaily.sort(function (a, b) { return a.TotalConfirmed - b.TotalConfirmed });
        for (let j = 0; j < this.covidDaily.length; j++) {
          if (this.covidDaily[j].id != null) {
            this.lineChartData[0].data[j] = this.covidDaily[j].TotalDeaths;
            this.lineChartData[1].data[j] = this.covidDaily[j].TotalRecovered;
            this.lineChartData[2].data[j] = this.covidDaily[j].TotalConfirmed;
            this.lineChartLabels[j] = moment().subtract('days', this.covidDaily.length - j).format('MMM Do');

          }

        }
        this.chart.update();
      }

    })

  }
}
