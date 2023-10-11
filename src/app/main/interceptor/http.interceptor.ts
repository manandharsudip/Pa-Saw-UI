import {
    HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const accessToken = sessionStorage.getItem('Access Token');

    if (accessToken) {
      let modifiedRequest = req.clone({

        setHeaders: {
            Authorization: `Bearer ${accessToken}`
        }
      });
      return next.handle(modifiedRequest);
    } else {
      return next.handle(req);
    }
  }
}
