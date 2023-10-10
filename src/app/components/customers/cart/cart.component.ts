import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(private http: HttpClient) {}

  allOrders: any = [];

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  public fetchAllOrders(): void {
    const userId = sessionStorage.getItem('User ID');
    this.http
      .get(
        environment.baseUrl + '/api/ems/cart/pending/' + userId,

        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${sessionStorage.getItem('Access Token')}`,
          }),
        }
      )
      .subscribe((data) => {
        this.allOrders = data;
      });
  }
}
