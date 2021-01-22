import { Injectable } from '@angular/core';
import firebase  from "firebase/app" ;
import { AngularFireAuth } from '@angular/fire/auth' ;
import {User} from './user.model' ;
import {AngularFirestore} from '@angular/fire/firestore';
import {NavigationEnd, Router} from '@angular/router' ;
import { CovidSummary } from './covidSummary.model';
import {HttpClient} from '@angular/common/http' ;
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CovidCountriesAll } from './covidCountriesAll.model';
import { CovidDaily } from './covidDaily.model';
import { SpecificCovidDaily } from './specificCovidDaily.model';
import { News } from './news.model';
@Injectable({
  providedIn: 'root'
})
export class Covid19Service {
  private user: User ;
  private covidSummary : CovidSummary ;
  private covidCountriesAll: Array<CovidCountriesAll> =[];
  private covidDaily: Array<CovidDaily> = [] ;
  private specificCovidDaily: Array<SpecificCovidDaily> = [];
  //private news : News ;

  constructor(
    private afAuth : AngularFireAuth, 
    private router: Router,
    private firestore : AngularFirestore,
    private http: HttpClient) { }


  async signInWithGoogle(){
    const credentials = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()) ;
    this.user = {
    uid: credentials.user.uid ,
    displayName : credentials.user.displayName,
    email : credentials.user.email 
    } ;  
    localStorage.setItem("user", JSON.stringify(this.user));
    this.updateUserData(this.user) ;
    this.router.navigate(["covid19"]); 
}


private updateUserData(user : User){
  this.firestore.collection("users").doc(this.user.uid).set(
    {uid: this.user.uid,
    displayName: this.user.displayName,
  email: this.user.email}, {merge : true}) ;
}

getUser(){
  if(this.user==null && this.userSignedIn()){
    this.user= JSON.parse(localStorage.getItem("user"));
  }
  return this.user;
}
userSignedIn() : boolean {
  return JSON.parse(localStorage.getItem("user"))!= null ;
  }

signOut() {
    this.afAuth.signOut();
    localStorage.removeItem("user");
    this.user=null ;
    this.router.navigate(["signin"]) ;
  }


apiRequestSummary() {
  this.http.get<JSON>('https://api.covid19api.com/summary').subscribe(data=> {
    //console.log(data);
    this.covidSummary = {
      totalCases: data['Global']['TotalConfirmed'] ,
      newCases : data['Global']['NewConfirmed']  ,
      activeCases : data['Global']['TotalConfirmed']- data['Global']['TotalRecovered'] -data['Global']['TotalDeaths'],
      totalRecovered :data['Global']['TotalRecovered'] ,
      newRecovered : data['Global']['NewRecovered'] ,
      recoveryRate : Math.round(data['Global']['TotalRecovered']/data['Global']['TotalConfirmed']*10000)/100 ,
      totalDeaths : data['Global']['TotalDeaths'] ,
      newDeaths : data['Global']['NewDeaths'] ,
      mortalityRate :   Math.round(data['Global']['TotalDeaths']/data['Global']['TotalConfirmed']*10000)/100 ,
      date : new Date(data['Date'])
    }
    this.covidCountriesAll=data['Countries'] ;
    
    this.updateSummary() ;
    this.updateCountries();
  
  })
}


private updateSummary(){
  this.firestore.collection("summary").doc("summary").set({
    totalCases: this.covidSummary.totalCases,
    newCases : this.covidSummary.newCases,
    activeCases: this.covidSummary.activeCases ,
    totalRecovered: this.covidSummary.totalRecovered,
    newRecovered: this.covidSummary.newRecovered,
    recoveryRate :  this.covidSummary.recoveryRate ,
    totalDeaths : this.covidSummary.totalDeaths,
    newDeaths: this.covidSummary.newDeaths,
    mortalityRate: this.covidSummary.mortalityRate,
    date: this.covidSummary.date
    }, {merge : true}) ;
}

getSummary(){
  console.log("getSummay") ;
  return this.firestore.collection("summary").doc("summary").valueChanges() ;
}

updateCountries(){
  this.covidCountriesAll.forEach(country =>{
    this.firestore.collection("countries").doc(country.Slug).set({
    Country : country.Country ,
    CountryCode : country.CountryCode, 
    NewConfirmed : country.NewConfirmed,
    NewDeaths: country.NewDeaths,
    NewRecovered: country.NewRecovered,
    Slug : country.Slug ,
    TotalConfirmed: country.TotalConfirmed ,
    TotalDeaths : country.TotalDeaths,
    TotalRecovered: country.TotalRecovered,
    Date: country.Date, 
    
    })
  })

  }


getCountries(){
  console.log("getCountries") ;
  return this.firestore.collection("countries").valueChanges() ; 
}

apiRequestDaily() {
  this.http.get<CovidDaily[]>('https://api.covid19api.com/world?from=2020-04-13').subscribe(data=> {
    this.covidDaily=data ;
    var n=0;
    this.covidDaily.forEach(data => data.id=n++ );
    this.updateDaily() ;
  })
  
  }
    
  updateDaily(){
    this.covidDaily.forEach(day =>{
      this.firestore.collection("daily").doc(day.id.toString()).set({
        NewConfirmed: day.NewConfirmed ,
        TotalConfirmed: day.TotalConfirmed,
        NewDeaths : day.NewDeaths,
        TotalDeaths : day.TotalDeaths,
        NewRecovered: day.TotalRecovered,
        TotalRecovered: day.TotalRecovered,
        id: day.id ,
      }) ;
  })
  }
  getDaily(){
    console.log("getDaily") ;
    return this.firestore.collection("daily").valueChanges() ; 
  }

  apiRequestSpecificDaily(slug : string) {
    this.http.get<SpecificCovidDaily[]>('https://api.covid19api.com/total/country/'+slug+'?from=2020-04-13 ').subscribe(data=> {
      this.specificCovidDaily=data ;
      this.updateSpecificDaily(slug) ;
    })
    
    }
    updateSpecificDaily(slug : string){
      this.specificCovidDaily.forEach(day =>{
        this.firestore.collection("countries").doc(slug).collection("daily").doc(day.Date).set({
          Active: day.Active,
          Confirmed: day.Confirmed ,
          Date: day.Date ,
          Deaths : day.Deaths,
          Recovered: day.Recovered,
        }) ;
    })
    }
    getSpecificDaily(slug : string){
      console.log("SpecificDaily");
      return this.firestore.collection("countries").doc(slug).collection("daily").valueChanges() ; 
    }

    addNews(news: News){
      this.firestore.collection("news").add(news) ;
     
      
    }

    getNews (){
      return this.firestore.collection("news").valueChanges();
    }

   

}

