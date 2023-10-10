import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  constructor(private http: HttpClient,private route: ActivatedRoute,) {}

  allProducts:any = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let categoryId = params.get('id');
      this.fetchProductsByCategory(categoryId);
    });
  }

  public fetchProductsByCategory(categoryId: string | null): void {
    this.http.get(environment.baseUrl+"/api/ems/product/category/"+categoryId).subscribe(data => {
      this.allProducts = data;
    });
  }
}
