import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { UserService } from '@app/_services';
import {  User  } from '@app/_models';

import { Store } from '@ngrx/store';
import { StartAction } from '@app/_redux/spinner/actions'
import { AppState } from '@app/_redux/spinner/interface';

@Component({
    selector: 'app-tables', 
    templateUrl: './component.html',
    styleUrls: ['./css.css']
})
export class component implements OnInit {
    private readonly notifier: NotifierService;

    public showDialogAlert: Boolean = false;
    public displayModal: Boolean = false;
    public displayModalNotificacion: Boolean = false;
    private typeSubmit: String = "";
    private itemSelected: User;
    public formGroup: FormGroup;
    public formGroupNotificacion: FormGroup;

    public items: Observable<any[]>;

    constructor(
        db: AngularFirestore,
        private formBuilder: FormBuilder,
        public apiService: UserService,
        notifierService: NotifierService
    ) {
        this.formGroup = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.formGroupNotificacion = this.formBuilder.group({
            nombre: ['', Validators.required],
        });

        this.notifier = notifierService;

        this.apiService.cargarNotificacion().subscribe();
        
        // this.items = db.collection('notificacion').valueChanges();
    }

    get nombreNoValido() {
        return this.formGroupNotificacion.get('nombre').invalid && this.formGroupNotificacion.get('nombre').touched;
    }

    get emailNoValido() {
        return this.formGroup.get('email').invalid && this.formGroup.get('email').touched;
    }

    get passwordNoValido() {
        return this.formGroup.get('password').invalid && this.formGroup.get('password').touched;
    }



    ngOnInit() {
        const accion = new StartAction();
        // this.store.dispatch(accion);
        // this.consulta();
    }

    public addItem(item,type): void {
        this.itemSelected = item;
        this.typeSubmit = type;
        if (type === 'editar') {
            this.formGroup.controls["email"].setValue(String(this.itemSelected.email));
            this.formGroup.controls["password"].setValue(String(this.itemSelected.password));
        }
    }

    public cancelTypeSubmit():void{
        this.typeSubmit = "";
        this.formGroup.controls["email"].setValue("");
        this.formGroup.controls["password"].setValue("");
    }


    private consulta():void {
        let idToken =  {
            "idToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzUwM2UwYWVjNTJkZGZiODk2NTIxYjkxN2ZiOGUyMGMxZjMzMDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29yZXNtYS0yNDQ0NiIsImF1ZCI6ImNvcmVzbWEtMjQ0NDYiLCJhdXRoX3RpbWUiOjE2MDE5NDA1NDMsInVzZXJfaWQiOiI4SjNpdDJlUDE1WEZSWVltNzB6UGVTWUhwWkQyIiwic3ViIjoiOEozaXQyZVAxNVhGUllZbTcwelBlU1lIcFpEMiIsImlhdCI6MTYwMTk0MDU0MywiZXhwIjoxNjAxOTQ0MTQzLCJlbWFpbCI6ImNvcnJlbzJAY29ycmVvLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJjb3JyZW8yQGNvcnJlby5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.M38UUJRJMiPzS3EORRnp7qMvsLRzHD-xNtEp4PaO8a36FZEG1OKzPZrj7FauFdGAEe-f1bgaU1duywFTHMS0wmncv3yANTrRXDdzwJSyUbpExBm6vSYPBtnZ7jbfR5qgOonVBLiG1RERZE6o3nP89b9S7WN61M6QdvwMNSjZGkKIAXIYrGQzpW8hNolLcUoIt3cfm6wkbxPpyQzgn5sIqlnOPU4LhIb2qUFHN97XFHvjbt1DeMe5ehylvdoxDWkFR72Ep79JayO63CAYi3jb9CnuFaJkofgXDuPeXwxSw9Ukxhu4XaUSnu5OnZ8bC-JXNShBjMaZDzRVaJjymOZfKg"
        }
        this.apiService.lookUp(idToken)
            .subscribe(data => {
                console.log(data);
                // this.cantos = data.jsonResultado;// ----> jsonResultado No se cambia viene la de interfaz de HttpClientInterface
            });
    }


    

    public guardarNotificacion(): void {
        if (!this.formGroupNotificacion.invalid) {
            this.displayModalNotificacion = false;
            if (this.typeSubmit !== "editar") {
                this.apiService.agregarNotificacion(this.formGroupNotificacion.value)
                                .then(()=>{
                                    this.formGroupNotificacion.controls["nombre"].setValue("");
                                    console.log("Guardado corectamente");
                                })
                                .catch((err)=> console.error("Error al enviar",err));
            } else {

            }
            
        } else {
            return Object.values(this.formGroupNotificacion.controls).forEach(control => {
                control.markAsTouched();
            }
            )
        }
    }



    public guardar(): void {
        if (!this.formGroup.invalid) {
            if (this.typeSubmit !== "editar") {

                console.log(this.formGroup.value);
                

                // this.apiService.agregarNotificacion();

                // this.apiService.signUp(this.formGroup.value)
                // .subscribe(
                //     data => {
                //         this.displayModal = false;
                //         this.cancelTypeSubmit();
                //         this.consulta();
                //     },
                //     error => {
                //         this.displayModal = false;
                //         this.cancelTypeSubmit();
                //     });
            } else {

                // this.apiService.editar(this.formGroup.value,this.itemSelected._id)
                // .subscribe(
                //     data => {
                //         this.displayModal = false;
                //         this.cancelTypeSubmit();
                //         this.consulta();
                //     },
                //     error => {
                //         this.displayModal = false;
                //         this.cancelTypeSubmit();
                //     });
                
            }
            

        } else {
            return Object.values(this.formGroup.controls).forEach(control => {
                control.markAsTouched();
            }
            )
        }
    }

    public confirmarEliminar(): void {
        // this.eliminar(this.itemSelected._id)
    }

    public eliminar(id): void {
        // this.apiService.eliminar(id)
        //     .subscribe(
        //         data => {
        //             this.displayModal = false;
        //             if (data.codE === 0) {
        //                 this.consulta();
        //             }else{ //info, success, warning, error
        //                 this.notifier.notify("warning", data.msgE); 
        //             }
        //         },
        //         error => {
        //             this.displayModal = false;
        //             console.log(error);
        //         });
    }


}
