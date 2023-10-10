import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input({ required: true }) allProducts: any = [];

  ngOnInit(): void {}

  constructor(private http: HttpClient) {}

  public addToCart(productID: any): void {
    const productData = { productid: productID, quantity: 1 };

    this.http.post(
      environment.baseUrl + '/api/ems/cart/addToCart',
      productData
    ).subscribe(response=>{
      console.log('Clicked', productID, response);
    });
  }
}
