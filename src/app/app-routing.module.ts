import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import { HomeComponent } from './components/customers/home/home.component';
import { AuthComponent } from './components/customers/auth/auth.component';
import { OrdersComponent } from './components/staff/orders/orders.component';
import { CartComponent } from './components/customers/cart/cart.component';
import { CategoryComponent } from './components/customers/category/category.component';
import { ProductItemComponent } from './components/customers/product-item/product-item.component';

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch:"full"},
  { path: "", component: HomeComponent},
  { path: "category/:id", component: CategoryComponent},  
  { path: "product-item/:id", component: ProductItemComponent},  
  {
    path: '', children:[
      { path: "signIn", component: AuthComponent},
      { path: "signUp", component: AuthComponent},
    ]
  },
  { path: "orders", component: OrdersComponent},
  { path: "carts", component: CartComponent},
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
