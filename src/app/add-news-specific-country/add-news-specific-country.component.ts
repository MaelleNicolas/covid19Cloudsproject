import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Covid19Service } from '../covid19.service';
import { News } from '../news.model';
import { User } from '../user.model';

@Component({
  selector: 'app-add-news-specific-country',
  templateUrl: './add-news-specific-country.component.html',
  styleUrls: ['./add-news-specific-country.component.css']
})
export class AddNewsSpecificCountryComponent implements OnInit {
  slug: string;
  date: any;
  description: string;
  country: string;
  user: User;
  title: string;
  code: string;
  constructor(public covid19Service: Covid19Service, public router: Router) { }

  ngOnInit(): void {
    this.user = this.covid19Service.getUser();
    var n = this.router.url.toString().split('/').length;
    this.slug = this.router.url.toString().split('/')[n - 1];
    this.country=this.slug;
  }
  addNews() {
    let news: News = {
      Date: (new Date(this.date)).toDateString(),
      description: this.description,
      user: this.user,
      country: this.country,
      title: this.title,
      code: this.code,
 
    };
    this.covid19Service.addNews(news);
    this.date = undefined;
    this.description = undefined;
    this.user = this.user;
    this.country = this.slug;
    this.title = undefined;
    this.code = undefined;
  }


}
