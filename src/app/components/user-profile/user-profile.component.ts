import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any;

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.http.get(environment.baseUrl+"/myInfo").subscribe((response)=>{
      this.userData = response;
    });
  }

}
