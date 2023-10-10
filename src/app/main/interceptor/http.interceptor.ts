import {
    HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const headersConfig = {
    //     'Accept': 'application/json'
    // };

    const accessToken = sessionStorage.getItem('Access Token');

    if (accessToken) {
        // headersConfig['Authorization'] = {"Bearer": accessToken};
      let modifiedRequest = req.clone({

        // headers: req.headers.append('Authorization', `Bearer ${accessToken}`)
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
