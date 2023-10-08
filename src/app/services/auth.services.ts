import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' }) // this can be added in providers as well in app.module.ts
export class AuthService {
  constructor(private http: HttpClient) {}

  authLogin(userData: Observable<any>) {
    return this.http.post(environment.baseUrl + '/login', userData);
  }
}
