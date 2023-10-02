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
    public usuario: any = [];
    constructor(
        private http: HttpClient,
        private router: Router,
        private afAuth: AngularFireAuth
    ) { }

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

    AuthLogin() {
        
        return this.afAuth.auth
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((result) => {
                return result
            }).catch((error) => {
                window.alert(error);
            });

    }

    logout() {
        console.log("cerramos1");
        
        this.usuario = {};
        this.afAuth.auth.signOut();
        sessionStorage.setItem('token', '')
    }

    createUserCore(body) {
        return this.http.post<any>(`${environment.apiUrlCore}api/v1/users`, body)
            .pipe(map(data => {
                return data;
            }));
    }

    getUserCore(email) {
        return this.http.get<User>(`${environment.apiUrlCore}api/v1/user/${email}`)
            .pipe(map(data => {
                return data;
            }));
    }
    updateUserUUIDCore(email, body) {
        return this.http.put<User>(`${environment.apiUrlCore}api/v1/user/${email}`, body)
            .pipe(map(data => {
                return data;
            }));
    }

    refreshToken() {
        this.afAuth.auth.currentUser.getIdToken(true).then(function (token) {
            console.log(token);
            console.log("cerramos2");
            sessionStorage.setItem('token', token)
        }).catch(function (error) {
            if (error) throw error
        });
    }

}