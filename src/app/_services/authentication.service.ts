import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) {}
    
    login(body) {
        return this.http.post<any>(`${environment.apiUrl}jwt/api-token-auth/`,body)
            .pipe(map(data => {
                return data;
            }));
    }

    arbolPermisos() {
        return this.http.get<any>(`${environment.apiUrl}permisos-users/2/`)
            .pipe(map(data => {
                return data;
            }
        ));
    }

}