import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { User } from '@app/_models';

import { environment } from '@environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public usuario:any = [];
    constructor(
        private http: HttpClient,
        private router: Router,
        private afAuth: AngularFireAuth
    ) {}

    signIn(data) {
        let keyFirebase = 'AIzaSyCbNLXEcfVeQjbVnpelMJbQKTUVzXKOg9Q';
        return this.http.post<User>(`${environment.apiUrlFirebase}signInWithPassword?key=${keyFirebase}`, data)
            .pipe(map(data => {
                console.log(data);
                return data;
            }
            ));
    }

    login(body) {
        return this.http.post<any>(`${environment.apiUrl}jwt/api-token-auth/`, body)
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

    loginSocial(type) {
        if (type === 'google') {
            this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        } else {
            this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
        }
        
    }
    logout() {
        this.usuario = {};
        this.afAuth.auth.signOut();
        sessionStorage.setItem('token', '')
    }

    refreshToken() {
        this.afAuth.auth.currentUser.getIdToken(true).then(function(token) {
            console.log(token);
            
            sessionStorage.setItem('token', token)
          }).catch(function(error) {
            if (error) throw error
          });
    }

}