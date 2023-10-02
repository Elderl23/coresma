import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { CloseAction } from '@app/_redux/spinner/actions';
import { AppState } from '@app/_redux/spinner/interface';


@Injectable()
export class SuccessInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppState>) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                const accion = new CloseAction();
                this.store.dispatch(accion);

                let response = event.body;
                if (response !== null && response.token !==  undefined && response.token !== "") {
                    // sessionStorage.setItem('token', response.token)
                }
                event = event.clone({ body: response })
            }
            return event;
        }))
    }
}