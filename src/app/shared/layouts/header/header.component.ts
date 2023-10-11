import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  allCategory: any = [];
  loggedIn: Boolean = false;
  isStaff: Boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchAllCategory();
  }

  ngDoCheck() {
    const user_session_id = sessionStorage.getItem('Access Token');
    if (user_session_id) {
      this.loggedIn = true;
    }

    const user_role = sessionStorage.getItem('Role');
    if (user_role === "ROLE_ADMIN" || user_role === "ROLE_STAFF"){
      this.isStaff = true;
    }
  }

  public fetchAllCategory(): void {
    this.http
      .get(environment.baseUrl + '/api/ems/category')
      .subscribe((data) => {
        this.allCategory = data;
      });
  }

  signOut() {
    sessionStorage.removeItem('Access Token');
    sessionStorage.removeItem('Role');
    sessionStorage.removeItem('User ID');
    this.router.navigateByUrl('/signIn');
    // location.reload();
  }
}
