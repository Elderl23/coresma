import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { HttpClientInterface } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class TipoEsquemasLiturgicosService {
    constructor(private http: HttpClient) {}

    consulta(): Observable<HttpClientInterface>  {
        return this.http.get<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/tipos/esquemas/liturgicos/consulta`)
            .pipe(map(data => {
                return data;
            }
        ));
    }

    guardar(data): Observable<HttpClientInterface>  {
        return this.http.post<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/tipos/esquemas/liturgicos/agregar`, data)
            .pipe(map(data => {
                return data;
            }
        ));
    }

    editar(data,id): Observable<HttpClientInterface>  {
        return this.http.put<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/tipos/esquemas/liturgicos/editar/${id}`, data)
            .pipe(map(data => {
                return data;
            }
        ));
    }

    eliminar(id): Observable<HttpClientInterface>  {
        return this.http.delete<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/tipos/esquemas/liturgicos/eliminar/${id}`)
            .pipe(map(data => {
                return data;
            }
        ));
    }

}