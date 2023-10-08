import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  allProducts:any = [];

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  public fetchAllProducts(): void {
    this.http.get(environment.baseUrl+"/api/ems/product").subscribe(data => {
      this.allProducts = data;
    });
  }
}
