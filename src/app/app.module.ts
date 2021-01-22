import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms' ;
import { AngularFireModule} from '@angular/fire' ;
import {AngularFirestoreModule} from '@angular/fire/firestore' ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SigninComponent } from './signin/signin.component';
import {Covid19Component} from './covid19/covid19.component' ;
import { ChartsModule } from 'ng2-charts';
import { SummaryComponent } from './summary/summary.component';
import { DistributionComponent } from './distribution/distribution.component';
import { DailyComponent } from './daily/daily.component';
import { TotalComponent } from './total/total.component';
import { HttpClientModule } from '@angular/common/http';
import { CountriesComponent } from './countries/countries.component';
import { SpecificCountryComponent } from './specific-country/specific-country.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpecificSummaryComponent } from './specific-summary/specific-summary.component';
import { SpecificDistributionComponent } from './specific-distribution/specific-distribution.component';
import { SpecificDailyComponent } from './specific-daily/specific-daily.component';
import { SpecificTotalComponent } from './specific-total/specific-total.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { AddNewsSpecificCountryComponent } from './add-news-specific-country/add-news-specific-country.component';


   
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    Covid19Component,
    SummaryComponent,
    DistributionComponent,
    DailyComponent,
    TotalComponent,
    CountriesComponent,
    SpecificCountryComponent,
    SpecificSummaryComponent,
    SpecificDistributionComponent,
    SpecificDailyComponent,
    SpecificTotalComponent,
    AddNewsComponent,
    AddNewsSpecificCountryComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    AppRoutingModule ,
    AngularFireModule.initializeApp(environment.firebaseConfig) ,
    AngularFirestoreModule,
    ChartsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
