import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as moment from 'moment';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { Covid19Service } from '../covid19.service';
import { SpecificCovidDaily } from '../specificCovidDaily.model';

@Component({
  selector: 'app-specific-daily',
  templateUrl: './specific-daily.component.html',
  styleUrls: ['./specific-daily.component.css']
})
export class SpecificDailyComponent implements OnInit {
  slug: string;
  name: string;
  specificDaily: SpecificDailyComponent;
  covidDaily: SpecificCovidDaily[]
  lineChartLabels: Label[] = [];
  ok : boolean=false ;


  public barChartOptions: ChartOptions = {
    responsive: true,
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
  

  public barChartData: ChartDataSets[] = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Daily Deaths' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Daiy Recovered' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Daiy New Cases' }
  ];






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
  }

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
  constructor(public covid19Service: Covid19Service, private router: Router) { }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  ngOnInit(): void {
    if (!this.ok){
    var l = this.router.url.toString().split('/').length;
    this.slug = this.router.url.toString().split('/')[l - 1];
    this.covid19Service.getSpecificDaily(this.slug).subscribe((covidDaily: SpecificCovidDaily[]) => {
      this.covidDaily = covidDaily;

      if (this.covidDaily.length > 100) {
        //this.covidDaily.sort(function (a, b) { return a.Recovered - b.Recovered });
        var n= this.covidDaily.length ;
        console.log( this.covidDaily);
        for (let j = 0; j < 7; j++) {
          this.barChartData[0].data[j] = this.covidDaily[n - 8 + j].Deaths - this.covidDaily[n - 9 + j].Deaths;
          this.barChartData[1].data[j] = this.covidDaily[n - 8 + j].Recovered - this.covidDaily[n - 9 + j].Recovered;
          this.barChartData[2].data[j] = this.covidDaily[n - 8 + j].Confirmed - this.covidDaily[n - 9 + j].Confirmed;
          this.barChartLabels[j] = moment().subtract('days', 6 - j).format('MMM Do');
          console.log(this.barChartData)
        }

        for (let j = 0; j < this.covidDaily.length; j++) {
          this.lineChartData[0].data[j] = this.covidDaily[j].Deaths;
          this.lineChartData[1].data[j] = this.covidDaily[j].Recovered;
          this.lineChartData[2].data[j] = this.covidDaily[j].Confirmed;
          this.lineChartLabels[j] = moment().subtract('days', this.covidDaily.length - j).format('MMM Do');


        }
        this.chart.update();

        console.log("ok");
        console.log(this.barChartData);
        console.log(this.lineChartLabels)
      }
    })



  }
  this.ok=true ; 
  }
}


