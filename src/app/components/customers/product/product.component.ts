import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input({ required: true }) allProducts: any = [];
  loggedIn: Boolean = false;
  isStaff: Boolean = false;

  ngOnInit(): void {}

  ngDoCheck() {
    const user_session_id = sessionStorage.getItem('Access Token');
    const user_role = sessionStorage.getItem('Role');

    if (user_session_id && user_role === "ROLE_CUSTOMER") {
      this.loggedIn = true;
    }
  }

  constructor(private http: HttpClient, private router: Router) {}

  public addToCart(productID: any): void {
    const productData = { productid: productID, quantity: 1 };

    this.http
      .post(environment.baseUrl + '/api/ems/cart/addToCart', productData)
      .subscribe();
      this.router.navigate(["/carts"]);
  }
}
