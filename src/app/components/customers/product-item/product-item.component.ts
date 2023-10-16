import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let productId = params.get('id');
      this.fetchProductsById(productId);
    });
  }

  public fetchProductsById(productId: string | null): void {
    this.http
      .get(environment.baseUrl + '/api/ems/product/' + productId)
      .subscribe((data) => {
        this.product = data;
      });
  }


  public addToCart(productID: any): void {
    const productData = { productid: productID, quantity: 1 };

    this.http
      .post(environment.baseUrl + '/api/ems/cart/addToCart', productData)
      .subscribe();
      this.router.navigate(["/carts"]);
  }
}
