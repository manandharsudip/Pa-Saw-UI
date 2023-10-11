import { Injectable } from '@angular/core';

import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';


// Admin before login check
// @Injectable({
//   providedIn: "root"
// })
// export class AdminAuthGuardLogin implements CanActivate {
//   constructor(private router: Router) { }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     let role = sessionStorage.getItem("role")
//     if (role == "admin") {
//       this.router.navigate(["/admin-dashboard"]);
//       return false;
//     } else {
//       return true;
//     }
//   }
// }

//Admin after login check
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem("Role")
    if (role == 'ROLE_ADMIN') {
      return true;
    } else {
      this.router.navigate([""]);
      return false;
    }
  }
}

//Customer(Buyer & Seller) before login
// @Injectable({
//   providedIn: "root"
// })
// export class Customer implements CanActivate {
//   constructor(private router: Router) { }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     let role = sessionStorage.getItem("role")
//     if (role == "seller") {
//       this.router.navigate(["/seller-dashboard"]);
//       return false;
//     } else if (role == "buyer") {
//       this.router.navigate(["/buyer-dashboard"]);
//       return false;
//     } else {
//       return true;
//     }
//   }
// }



// Customer after login
@Injectable({
  providedIn: 'root'
})
export class CustomerAuthGaurdService {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem("Role")
    if (role == 'ROLE_CUSTOMER') {
      return true;
    } else {
      this.router.navigate(["/signIn"]);
      return false;
    }
  }
}