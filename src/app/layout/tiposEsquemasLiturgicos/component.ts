import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { TipoEsquemasLiturgicosService, EsquemasCantosService } from '@app/_services';
import { TipoEsquemasLiturgicos, JsonResultadoTipoEsquemasLiturgicos, EsquemasCantos } from '@app/_models';

@Component({
    selector: 'app-tables', 
    templateUrl: './component.html',
})
export class component implements OnInit {
    public showDialogAlert: Boolean = false;
    public displayModal: Boolean = false;
    private typeSubmit: String = "";
    private itemSelected: JsonResultadoTipoEsquemasLiturgicos;
    public esquemasCantosObject: EsquemasCantos;
    public formGroup: FormGroup;

    public tipoEsquemaCantos: TipoEsquemasLiturgicos;//Variable que se va a iterar en el template
    

    constructor(
        private formBuilder: FormBuilder,
        private apiService: TipoEsquemasLiturgicosService,
        private apiServiceCatalogos: EsquemasCantosService,
    ) {
        this.formGroup = this.formBuilder.group({
            titulo: ['', Validators.required],
            esquemasCantos: ['', Validators.required],
        });
    }

    get tituloNoValido() {
        return this.formGroup.get('titulo').invalid && this.formGroup.get('titulo').touched;
    }

    get esquemasCantosNoValido() {
        return this.formGroup.get('esquemasCantos').invalid && this.formGroup.get('esquemasCantos').touched;
    }


    ngOnInit() {
        this.consulta();
    }   

    private consulta():void {
        this.apiService.consulta()
            .subscribe(data => {
                this.tipoEsquemaCantos = data.jsonResultado;// ----> jsonResultado No se cambia viene la de interfaz de HttpClientInterface
            });
    }

    private consultaCatalogoEsquemasCantos():void {
        this.apiServiceCatalogos.consulta()
            .subscribe(data => {
                this.esquemasCantosObject = data.jsonResultado;// ----> jsonResultado No se cambia viene la de interfaz de HttpClientInterface
            });
    }

    public addItem(item,type): void {
        this.itemSelected = item;
        this.typeSubmit = type;

        if (type === 'editar') {
            this.consultaCatalogoEsquemasCantos();
            this.formGroup.controls["titulo"].setValue(String(this.itemSelected.titulo));
            let esquemasCantos = item;
            const arrayEsquemasCantos = [];
            esquemasCantos.esquemasCantos.forEach(element => {
                arrayEsquemasCantos.push(element._id);
            });
            this.formGroup.controls["esquemasCantos"].setValue(arrayEsquemasCantos);
            console.log(this.formGroup.value);
            
        }
    }

    public cancelTypeSubmit():void{
        this.consultaCatalogoEsquemasCantos();
        this.typeSubmit = "";
        this.formGroup.controls["titulo"].setValue("");
        this.formGroup.controls["esquemasCantos"].setValue("");
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
