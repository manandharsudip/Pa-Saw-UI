import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  allCategory: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllCategory();
  }


  public fetchAllCategory(): void{
    this.http.get(environment.baseUrl+"/api/ems/category").subscribe(data=>{
      this.allCategory = data;
    });
  }
}
