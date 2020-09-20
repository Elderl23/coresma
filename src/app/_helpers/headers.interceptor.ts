import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    constructor() {
        
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authorization = '';
        let ContentType = 'application/json; charset=utf-8';

        if(sessionStorage.getItem('token') !== null){
            authorization = 'JWT '+ sessionStorage.getItem('token'); 
        }

            request = request.clone({
                setHeaders: {
                    Authorization: authorization,
                    "Content-Type": ContentType,
                    "Accept": ContentType
                }
            });
        return next.handle(request);
        
        

    }
}