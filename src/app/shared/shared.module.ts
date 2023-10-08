import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
      HeaderComponent,
      FooterComponent,
      PageNotFoundComponent
    ],
    imports: [
      CommonModule,
      RouterModule
    ],
    exports: [
      HeaderComponent,
      FooterComponent,
      PageNotFoundComponent
    ]
  })
  export class SharedModule { }