import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import { HomeComponent } from './components/customers/home/home.component';
import { AuthComponent } from './components/customers/auth/auth.component';

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch:"full"},
  { path: "", component: HomeComponent},
  {
    path: '', children:[
      { path: "sign-in", component: AuthComponent},
      { path: "sign-up", component: AuthComponent},
    ]
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
