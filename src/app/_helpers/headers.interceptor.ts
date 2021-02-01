import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '@app/_redux/spinner/interface';
import { StartAction } from '@app/_redux/spinner/actions'


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppState>) {

        
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
       


        let authorization = '';
        let ContentType = 'application/json; charset=utf-8';

        if(sessionStorage.getItem('token') !== null){
            authorization = 'Bearer '+ sessionStorage.getItem('token'); 
        }

        const accion = new StartAction();
        this.store.dispatch(accion);

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