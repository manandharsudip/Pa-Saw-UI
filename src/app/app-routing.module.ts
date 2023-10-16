import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import { HomeComponent } from './components/customers/home/home.component';
import { AuthComponent } from './components/customers/auth/auth.component';
import { OrdersComponent } from './components/staff/orders/orders.component';
import { CartComponent } from './components/customers/cart/cart.component';
import { CategoryComponent } from './components/customers/category/category.component';
import { ProductItemComponent } from './components/customers/product-item/product-item.component';
import { AuthStaffComponent } from './components/staff/auth-staff/auth-staff.component';
import {
  AdminAuthGaurdService,
  AuthGaurdService,
  CustomerAuthGaurdService,
} from './services/auth-guard.service';
import { StaffCategoryComponent } from './components/staff/staff-category/staff-category.component';
import { AdminPanelComponent } from './components/staff/admin-panel/admin-panel.component';
import { StaffProductComponent } from './components/staff/staff-product/staff-product.component';
import { CustOrdersComponent } from './components/customers/cust-orders/cust-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  {
    path: 'myProfile',
    component: UserProfileComponent,
    canActivate: [AuthGaurdService],
  },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'product-item/:id', component: ProductItemComponent },
  {
    path: '',
    children: [
      { path: 'signIn', component: AuthComponent },
      { path: 'signUp', component: AuthComponent },
    ],
  },
  {
    path: 'auth/admin',
    component: AuthStaffComponent,
  },
  {
    path: '',
    canActivate: [CustomerAuthGaurdService],
    children: [
      { path: 'carts', component: CartComponent },
      { path: 'cust-orders', component: CustOrdersComponent },
    ],
  },
  {
    path: '',
    canActivate: [AdminAuthGaurdService],
    children: [
      { path: 'ems/admin-panel', component: AdminPanelComponent },
      { path: 'ems/category', component: StaffCategoryComponent },
      { path: 'ems/product', component: StaffProductComponent },
      { path: 'ems/orders', component: OrdersComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
