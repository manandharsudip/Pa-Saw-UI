import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cust-orders',
  templateUrl: './cust-orders.component.html',
  styleUrls: ['./cust-orders.component.scss']
})
export class CustOrdersComponent {
  constructor(private http: HttpClient) {}

  allCarts: any = [];
  selectAll: boolean = false;
  totalPrice: number = 0;
  checkedItemIds: number[] = [];

  onCheckboxChange(cart: any): void {
    if (cart.checked) {
      this.totalPrice += cart.quantity * cart.productEntity.price;
      this.checkedItemIds.push(cart.id);
    } else {
      const index = this.checkedItemIds.indexOf(cart.id);
      if (index !== -1) {
        this.checkedItemIds.splice(index, 1);
        this.totalPrice -= cart.quantity * cart.productEntity.price;
      }
    }
  }

  toggleAllCheckboxes(): void {
    this.totalPrice = 0;
    this.checkedItemIds = []; // Clear the array
    this.allCarts.forEach((cart: any) => {
      cart.checked = this.selectAll;
      if (cart.checked) {
        this.totalPrice += cart.quantity * cart.productEntity.price;
        this.checkedItemIds.push(cart.id);
      }
    });
  }

  btnClick(): void {
    if (this.checkedItemIds.length == 0) {
      alert('Check At least one item');
    } else {

      const formData1 = new FormData();

      for (const itemId of this.checkedItemIds) {
        formData1.append('cartList', itemId.toString());
      }
      this.http
        .post(environment.baseUrl + '/api/ems/order/addOrder', formData1)
        .subscribe();
      console.log('Total Price: ', this.totalPrice);
      console.log('Items: ', this.checkedItemIds);
    }
  }

  ngOnInit(): void {
    this.fetchAllCarts();
  }

  // toggleAllCheckboxes() {
  //   for (const cart of this.allCarts) {
  //     cart.checked = this.selectAll;
  //   }
  // }

  // onCheckboxChange(cart: any) {
  //   console.log(
  //     `Checkbox with ID ${cart.id} is ${cart.checked ? 'checked' : 'unchecked'}`
  //   );
  //   this.getSelectedcarts();
  // }

  getSelectedcarts() {
    // const selectedItems = this.allCarts.filter(item => item.checked);
    // const selectedIds = selectedItems.map(item => item.id);
    // console.log('Selected IDs:', selectedIds);
  }

  public fetchAllCarts(): void {
    const userId = sessionStorage.getItem('User ID');
    this.http
      .get(
        environment.baseUrl + '/api/ems/cart/' + userId,

        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${sessionStorage.getItem('Access Token')}`,
          }),
        }
      )
      .subscribe((data) => {
        this.allCarts = data;
        // this.calculateTotal();
      });
  }

  onQuantityChange(): void {
    this.calculateTotal();
  }

  public calculateTotal(): void {
    let totalPrice = 0;
    this.allCarts.forEach((item: any) => {
      totalPrice += item.productEntity.price * item.quantity;
    });
    this.totalPrice = totalPrice;
    console.log(totalPrice);
  }
}
