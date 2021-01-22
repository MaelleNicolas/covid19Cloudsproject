import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../covid19.service';
import { News } from '../news.model';
import { User } from '../user.model';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
date : any;
description : string ;
country : string="Worldwide" ;
user : User ;
title : string ;
code : string ;
  constructor(public covid19Service: Covid19Service) { }

  ngOnInit(): void {
    this.user=this.covid19Service.getUser();
  }  
  addNews(){
    let news : News = {
      Date: (new Date(this.date)).toDateString(),
      description : this.description,
      user : this.user,
      country : this.country ,
      title : this.title ,
    code : this.code   };
    this.covid19Service.addNews(news) ;
    this.date= undefined;
    this.description = undefined;
    this.user= this.user;
    this.title=undefined
    this.title=undefined ;
  }

}
