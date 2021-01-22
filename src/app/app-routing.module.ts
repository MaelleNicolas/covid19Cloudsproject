import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CountriesComponent } from './countries/countries.component';
import { Covid19Component } from './covid19/covid19.component';
import { SecurePagesGuard } from './secure-pages.guard';
//import { SecurePagesGuard } from './secure-pages.guard';
import { SigninComponent } from './signin/signin.component';
import { SpecificCountryComponent } from './specific-country/specific-country.component';

const routes: Routes = [
  {path : "signin" , component : SigninComponent,  canActivate : [SecurePagesGuard]},
  {path : "covid19" , component : Covid19Component, canActivate : [AuthGuard]},
  {path: "specificCountry/:slug" , component : SpecificCountryComponent ,canActivate : [AuthGuard]  },
  {path : "", pathMatch: "full", redirectTo : "signin"} ,
  {path : "**" , redirectTo : "signin"}  ,
 
   
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
