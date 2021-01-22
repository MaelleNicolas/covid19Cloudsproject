import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Covid19Service } from './covid19.service';

@Injectable({
  providedIn: 'root'
})
export class SecurePagesGuard implements CanActivate {
  constructor (private covidService : Covid19Service,
    private router: Router) {}; 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.covidService.userSignedIn()) {
        this.router.navigate(["covid19"]) ;
    }
      return true;
  }
  
}
