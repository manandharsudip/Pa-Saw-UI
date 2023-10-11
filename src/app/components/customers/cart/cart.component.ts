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
  selectAll: boolean = false;

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  toggleAllCheckboxes() {
    for (const order of this.allOrders) {
      order.checked = this.selectAll;
    }
  }

  onCheckboxChange(order: any) {
    console.log(`Checkbox with ID ${order.id} is ${order.checked ? 'checked' : 'unchecked'}`);
    this.getSelectedOrders();
  }

  getSelectedOrders() {
    
    // const selectedItems = this.allOrders.filter(item => item.checked);
    // const selectedIds = selectedItems.map(item => item.id);
    // console.log('Selected IDs:', selectedIds);
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
