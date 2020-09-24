import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { TipoEsquemasLiturgicosService } from '@app/_services';
import { TipoEsquemasLiturgicos, JsonResultadoTipoEsquemasLiturgicos } from '@app/_models';

@Component({
    selector: 'app-tables', 
    templateUrl: './component.html',
})
export class component implements OnInit {
    public showDialogAlert: Boolean = false;
    public displayModal: Boolean = false;
    private typeSubmit: String = "";
    private itemSelected: JsonResultadoTipoEsquemasLiturgicos;
    public formGroup: FormGroup;

    public esquemaCantos: TipoEsquemasLiturgicos;//Variable que se va a iterar en el template
    

    constructor(
        private formBuilder: FormBuilder,
        private apiService: TipoEsquemasLiturgicosService,
    ) {
        this.formGroup = this.formBuilder.group({
            titulo: ['', Validators.required],
            tiempoliturgico: [false],
        });
    }

    get tituloNoValido() {
        return this.formGroup.get('titulo').invalid && this.formGroup.get('titulo').touched;
    }


    ngOnInit() {
        this.consulta();
    }

    private consulta():void {
        this.apiService.consulta()
            .subscribe(data => {
                this.esquemaCantos = data.jsonResultado;// ----> jsonResultado No se cambia viene la de interfaz de HttpClientInterface
            });
    }

    public addItem(item,type): void {
        this.itemSelected = item;
        this.typeSubmit = type;
        if (type === 'editar') {
            this.formGroup.controls["titulo"].setValue(String(this.itemSelected.titulo));
            // this.formGroup.controls["tiempoliturgico"].setValue(this.itemSelected.tiempoliturgico);
        }
    }

    public cancelTypeSubmit():void{
        this.itemSelected = {
            titulo: "",
            esquemasCantos:this.itemSelected.esquemasCantos,
            status: false,
            _id: "",
        };
        this.typeSubmit = "";
        this.formGroup.controls["titulo"].setValue("");
        // this.formGroup.controls["tiempoliturgico"].setValue(false);
    }


    public guardar(): void {
        if (!this.formGroup.invalid) {
            if (this.typeSubmit !== "editar") {
                this.apiService.guardar(this.formGroup.value)
                .subscribe(
                    data => {
                        this.displayModal = false;
                        this.cancelTypeSubmit();
                        this.consulta();
                    },
                    error => {
                        this.displayModal = false;
                        this.cancelTypeSubmit();
                    });
            } else {

                this.apiService.editar(this.formGroup.value,this.itemSelected._id)
                .subscribe(
                    data => {
                        this.displayModal = false;
                        this.cancelTypeSubmit();
                        this.consulta();
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
        this.apiService.eliminar(id)
            .subscribe(
                data => {
                    this.displayModal = false;
                    this.consulta();
                },
                error => {
                    this.displayModal = false;
                    console.log(error);
                });
    }


}
