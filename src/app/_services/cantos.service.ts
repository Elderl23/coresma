import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { HttpClientInterface } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class CantosService {
    constructor(private http: HttpClient) {}

    consulta(): Observable<HttpClientInterface>  {
        return this.http.get<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/cantos/admin/consulta`)
            .pipe(map(data => data));
    }

    consultaIdTiempoLiturgico(idTiempoLiturgico): Observable<HttpClientInterface>  {
        return this.http.get<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/cantos/consulta/${idTiempoLiturgico}`)
            .pipe(map(data => data));
    }
    consultaIdEsquemasCantos(idEsquemasCantos): Observable<HttpClientInterface>  {
        return this.http.get<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/cantos/consulta/esquemas/cantos/${idEsquemasCantos}`)
            .pipe(map(data => data));
    }

    guardar(data): Observable<HttpClientInterface>  {
        return this.http.post<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/cantos/admin/agregar`, data)
            .pipe(map(data => {
                return data;
            }
        ));
    }

    editar(data,id): Observable<HttpClientInterface>  {
        return this.http.put<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/cantos/admin/editar/${id}`, data)
            .pipe(map(data => {
                return data;
            }
        ));
    }

    eliminar(id): Observable<HttpClientInterface>  {
        return this.http.delete<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/cantos/admin/eliminar/${id}`)
            .pipe(map(data => {
                return data;
            }
        ));
    }

    consultaLetra(id): Observable<HttpClientInterface>  {
        return this.http.get<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/letra/consulta/${id}`)
            .pipe(map(data => {
                return data;
            }
        ));
    }

    guardarLetra(data): Observable<HttpClientInterface>  {
        return this.http.post<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/letra/agregar/`, data)
            .pipe(map(data => {
                return data;
            }
        ));
    }

    editarLetra(data,id): Observable<HttpClientInterface>  {
        return this.http.put<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/letra/editar/${id}`, data)
            .pipe(map(data => {
                return data;
            }
        ));
    }

    eliminarLetra(id): Observable<HttpClientInterface>  {
        return this.http.delete<HttpClientInterface>(`${environment.apiUrlCoresmaApp}api/eliminar/${id}`)
            .pipe(map(data => {
                return data;
            }
        ));
    }

}