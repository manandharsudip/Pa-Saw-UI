import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  selectedValue!: string;
  orderId!: number;
  constructor(private http: HttpClient) {}

  allOrders: any = [];

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  public fetchAllOrders(): void {
    this.http.get(environment.baseUrl + '/api/ems/order').subscribe((data) => {
      this.allOrders = data;
    });
  }

  public onChangingStatus(): void {
    console.log(this.selectedValue);
    const formData1 = new FormData();
    formData1.set('status', this.selectedValue);
    console.log(this.orderId);
    this.http
      .put(
        environment.baseUrl + '/api/ems/order/changeStatus/' + this.orderId,
        formData1
      )
      .subscribe();
    location.reload();
  }

  // modal form ...
  displayStyle = 'none';

  openPopup(category: any) {
    if (category == 0) {
    } else if (category !== 0) {
      console.log(category.id);
      this.orderId = category.id;

      // console.log(this.selectedCategory.categoryId)
    }

    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }
}
