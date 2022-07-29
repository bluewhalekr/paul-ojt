import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENV } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor{

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `${ENV.API_URL}${req.url}` });
    return next.handle(apiReq);
  }
}
