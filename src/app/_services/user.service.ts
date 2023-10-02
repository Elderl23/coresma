import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { User, Notificacion } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    public notificacion: Notificacion[] = []
    public itemsCollection: AngularFirestoreCollection<Notificacion>;


    constructor(
        private http: HttpClient,
        private afs: AngularFirestore,
        
        ) {

    }
    
    cargarNotificacion(){
        this.itemsCollection = this.afs.collection<Notificacion>('notificacion', ref => ref.orderBy('fecha','desc'));
        return this.itemsCollection.valueChanges()
            .pipe(map((notificacion:Notificacion[]) => {
                this.notificacion = notificacion;
            }))
    }

    agregarNotificacion(texto:any){
        let data : Notificacion = {
            nombre:texto.nombre,
            fecha: new Date().getTime(),
            id:'4'
        }
        return this.itemsCollection.add(data);
    }

    lookUp(data) {
        let keyFirebase = 'AIzaSyCbNLXEcfVeQjbVnpelMJbQKTUVzXKOg9Q';
        return this.http.post<User>(`${environment.apiUrlFirebase}lookup?key=${keyFirebase}`, data)
            .pipe(map(data => {
                return data;
            }
            ));
    }

    signIn(data) {
        let keyFirebase = 'AIzaSyCbNLXEcfVeQjbVnpelMJbQKTUVzXKOg9Q';
        return this.http.post<User>(`${environment.apiUrlFirebase}signInWithPassword?key=${keyFirebase}`, data)
            .pipe(map(data => {
                return data;
            }
            ));
    }

    signUp(data): Observable<User> {
        let keyFirebase = 'AIzaSyCbNLXEcfVeQjbVnpelMJbQKTUVzXKOg9Q';
        return this.http.post<User>(`${environment.apiUrlFirebase}signUp?key=${keyFirebase}`, data)
            .pipe(map(data => {
                return data;
            }
            ));
    }
}