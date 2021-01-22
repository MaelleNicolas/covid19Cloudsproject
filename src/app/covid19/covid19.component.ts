import { Component, OnInit } from '@angular/core';
//import { Covid19 } from '../covid19.model';
import { Covid19Service } from '../covid19.service';
import { News } from '../news.model';
import {User} from '../user.model' ;
@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit {
  user : User ;
  news : Array<News>=[] ;
  ok : boolean=false ;
  constructor(public covid19Service : Covid19Service) { }

  ngOnInit(): void {
    this.user=this.covid19Service.getUser(); 
    
    this.covid19Service.getNews().subscribe((news : News[])=>{
      for(let n of news) {
        if (n.country=='Worldwide'  && n.code=="Breizh1532" && !this.ok ){

          this.news.push(n)
        }
        
      };
      this.ok=true;
    })
  
  }



}
