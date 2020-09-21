import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                let response = event.body;
                if (response !== null && response.token !==  undefined && response.token !== "") {
                    sessionStorage.setItem('token', response.token)
                }
                event = event.clone({ body: response })
            }
            return event;
        }))
    }
}