import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(private http: HttpClient) {}

  allOrders: any = [];

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  public fetchAllOrders(): void {
    this.http
      .get(
        environment.baseUrl + '/api/ems/order',

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
