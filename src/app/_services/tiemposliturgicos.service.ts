import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { TiemposLiturgicos } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class TiemposLiturgicosService {
    constructor(private http: HttpClient) {}
    
    actualizar(body) {
        return this.http.post<any>(`${environment.apiUrlCoresmaApp}api/tiempos/liturgicos/consulta`,body)
            .pipe(map(data => {
                return data;
            }));
    }

    consulta()  {
        return this.http.get(`${environment.apiUrlCoresmaApp}api/tiempos/liturgicos/consulta`)
            .pipe(map(data => {
                return data;
            }
        ));
    }

}