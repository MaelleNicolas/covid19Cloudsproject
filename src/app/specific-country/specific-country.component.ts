import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../covid19.service';
import { Router } from '@angular/router';
import { News } from '../news.model';


@Component({
  selector: 'app-specific-country',
  templateUrl: './specific-country.component.html',
  styleUrls: ['./specific-country.component.css']
})
export class SpecificCountryComponent implements OnInit {

  slug: string;
  news: Array<News> = [];
  ok : boolean=false ;
  constructor(private router: Router, public covid19Service: Covid19Service) { }

  ngOnInit(): void {
    var n = this.router.url.toString().split('/').length;
    this.slug = this.router.url.toString().split('/')[n - 1];
    this.covid19Service.getNews().subscribe((news : News[])=>{
      for(let n of news) {
        if (n.country==this.slug  && n.code=="Breizh1532" && !this.ok ){

          this.news.push(n)
        }
        
      };
      this.ok=true;
    })
  
  }



  
  public backWorldData() {
    this.router.navigate(["covid19/"]);
  }

}