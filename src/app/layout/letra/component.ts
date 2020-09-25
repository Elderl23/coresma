import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import { CantosService } from '@app/_services';
import { Letras, JsonResultadoLetras } from '@app/_models';

@Component({
    selector: 'app-tables', 
    templateUrl: './component.html',
    styleUrls: ['./css.css']
})
export class component implements OnInit {
    public showDialogAlert: Boolean = false;
    public displayModal: Boolean = false;
    private typeSubmit: String = "";
    private itemSelected: JsonResultadoLetras;
    public formGroup: FormGroup;
    private paramsId: string = "";

    public letras: Letras;//Variable que se va a iterar en el template
    public titulo: string = "";//Variable que se va a iterar en el template
    

    constructor(
        private formBuilder: FormBuilder,
        private apiService: CantosService,
        private activatedRoute: ActivatedRoute
    ) {
        this.formGroup = this.formBuilder.group({
            canto: ['', Validators.required],
            texto: ['', Validators.required],
            etiqueta: ['', Validators.required],
            estilo: ['', Validators.required],
        });
    }

    get textoNoValido() {
        return this.formGroup.get('texto').invalid && this.formGroup.get('texto').touched;
    }
    get etiquetaNoValido() {
        return this.formGroup.get('etiqueta').invalid && this.formGroup.get('etiqueta').touched;
    }
    get estiloNoValido() {
        return this.formGroup.get('estilo').invalid && this.formGroup.get('estilo').touched;
    }


    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            this.paramsId = id;
            this.formGroup.controls["canto"].setValue(this.paramsId);
            this.consulta(id);
      });
    }

    private consulta(id):void {
        this.apiService.consultaLetra(id)
            .subscribe(data => {
                this.letras = data.jsonResultado;// ----> jsonResultado No se cambia viene la de interfaz de HttpClientInterface
                this.titulo = this.letras[0].canto.titulo;
            });
    }

    public addItem(item,type): void {
        this.itemSelected = item;
        this.typeSubmit = type;
        if (type === 'editar') {
            this.formGroup.controls["texto"].setValue(String(this.itemSelected.texto));
            this.formGroup.controls["etiqueta"].setValue(String(this.itemSelected.etiqueta));
            this.formGroup.controls["estilo"].setValue(String(this.itemSelected.estilo));
        
        }
    }

    public cancelTypeSubmit():void{
        this.itemSelected = {
            texto: "",
            etiqueta:"",
            estilo:"",
            status: false,
            _id: "",
        };
        this.typeSubmit = "";
        this.formGroup.controls["texto"].setValue("");
        this.formGroup.controls["etiqueta"].setValue("");
        this.formGroup.controls["estilo"].setValue("");
    }


    public guardar(): void {
        if (!this.formGroup.invalid) {
            if (this.typeSubmit !== "editar") {
                this.apiService.guardarLetra(this.formGroup.value)
                .subscribe(
                    data => {
                        this.displayModal = false;
                        this.cancelTypeSubmit();
                        this.consulta(this.paramsId);
                    },
                    error => {
                        this.displayModal = false;
                        this.cancelTypeSubmit();
                    });
            } else {

                this.apiService.editarLetra(this.formGroup.value,this.itemSelected._id)
                .subscribe(
                    data => {
                        this.displayModal = false;
                        this.cancelTypeSubmit();
                        this.consulta(this.paramsId);
                    },
                    error => {
                        this.displayModal = false;
                        this.cancelTypeSubmit();
                    });
                
            }
            

        } else {
            return Object.values(this.formGroup.controls).forEach(control => {
                control.markAsTouched();
            }
            )
        }
    }

    public confirmarEliminar(): void {
        this.eliminar(this.itemSelected._id)
    }

    public eliminar(id): void {
        this.apiService.eliminarLetra(id)
            .subscribe(
                data => {
                    this.displayModal = false;
                    this.consulta(this.paramsId);
                },
                error => {
                    this.displayModal = false;
                    console.log(error);
                });
    }


}
