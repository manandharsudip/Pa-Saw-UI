import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthStaffComponent } from './auth-staff/auth-staff.component';
import { OrdersComponent } from './orders/orders.component';
import { StaffCategoryComponent } from './staff-category/staff-category.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StaffProductComponent } from './staff-product/staff-product.component';


@NgModule({
    declarations: [
        AuthStaffComponent,
        OrdersComponent,
        StaffCategoryComponent,
        AdminPanelComponent,
        StaffProductComponent
    ],
    exports: [
        AuthStaffComponent,
        OrdersComponent,
        StaffCategoryComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
  export class StaffModule { }