import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MyUser } from './cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private http: HttpClient) {}

  allCarts: any = [];
  selectAll: boolean = false;
  totalPrice: number = 0;
  checkedItemIds: number[] = [];
  itemsWithQuantities: any = [];

  myUser: MyUser = {
    address: '',
    phonenumber: 0,
  };

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

      const itemsWithQuantities = this.allCarts
        .filter((cart: any) => this.checkedItemIds.includes(cart.id))
        .map((cart: any) => ({
          orderid: cart.id,
          quantity: cart.quantity,
        }));

      console.log(itemsWithQuantities);

      const formData2 = new FormData();
      // formData2.set('address', this.myUser.address);
      // formData2.set('phonenumber', this.myUser.phonenumber);

      console.log(this.myUser);

      this.http
        .post(environment.baseUrl + '/api/ems/order/addOrder', formData1)
        .subscribe();

      this.http
        .put(
          environment.baseUrl + '/api/ems/cart/updateToCart',
          itemsWithQuantities
        )
        .subscribe();


        this.http
        .put(
          environment.baseUrl + '/updateUser',
          this.myUser
        )
        .subscribe();
        location.reload();
    }
  }

  ngOnInit(): void {
    this.fetchAllCarts();
  }

  public fetchAllCarts(): void {
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
  }

  deleteCartItem(id: any): void{
    this.http.delete(environment.baseUrl+"/api/ems/cart/"+id).subscribe();
    location.reload();
  }

  // modal form ...
  displayStyle = 'none';

  openPopup(category: any) {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }
}
