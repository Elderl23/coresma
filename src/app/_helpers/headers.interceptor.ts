import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { StartAction } from '@app/_redux/spinner/actions'
import { AppState } from '@app/_redux/spinner/interface';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppState>) {

            this.store.subscribe(state =>{
                console.log(state);
            });
        
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const accion = new StartAction();
        this.store.dispatch(accion);


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