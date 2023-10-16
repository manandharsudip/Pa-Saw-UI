import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' }) // this can be added in providers as well in app.module.ts
export class AuthService {
  constructor(private http: HttpClient) {}

  authLogin(userData: any) {
    return this.http.post(
      environment.baseUrl + '/login',
      userData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }),
      }
      // {
      //     headers: new HttpHeaders({
      //         'custom-header': 'angular basic'
      //     }),
      //     // observe: 'response', // gives total response like status code and all
      //     // responseType: 'text' // converts into text type
      //   }
    );
  }

  authRegister(userData: Observable<any>) {
    return this.http.post(environment.baseUrl + '/register', userData, {});
  }
}
