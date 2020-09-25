import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { CantosService, EsquemasCantosService, TiemposLiturgicosService } from '@app/_services';
import { Cantos, JsonResultadoCantos,EsquemasCantos, TiemposLiturgicos } from '@app/_models';

@Component({
    selector: 'app-tables', 
    templateUrl: './component.html',
    styleUrls: ['./css.css']
})
export class component implements OnInit {
    public showDialogAlert: Boolean = false;
    public displayModal: Boolean = false;
    private typeSubmit: String = "";
    private itemSelected: JsonResultadoCantos;
    public formGroup: FormGroup;

    public cantos: Cantos;//Variable que se va a iterar en el template
    public esquemasCantos: EsquemasCantos;//Variable que se va a iterar en el template
    public tiempoLiturgicos: TiemposLiturgicos;//Variable que se va a iterar en el template
    

    constructor(
        private formBuilder: FormBuilder,
        private apiService: CantosService,
        private apiServiceEsquemaCanto: EsquemasCantosService,
        private apiServiceTiemposLiturgicos: TiemposLiturgicosService,
        private route:Router
    ) {
        this.formGroup = this.formBuilder.group({
            titulo: ['', Validators.required],
            descripcion: ['', Validators.required],
            tiempoLiturgico: ['', Validators.required],
            esquemaCanto: ['', Validators.required],
        });
    }

    get tituloNoValido() {
        return this.formGroup.get('titulo').invalid && this.formGroup.get('titulo').touched;
    }

    get descripcionNoValido() {
        return this.formGroup.get('descripcion').invalid && this.formGroup.get('descripcion').touched;
    }

    get tiempoLiturgicoNoValido() {
        return this.formGroup.get('tiempoLiturgico').invalid && this.formGroup.get('tiempoLiturgico').touched;
    }

    get esquemaCantoNoValido() {
        return this.formGroup.get('esquemaCanto').invalid && this.formGroup.get('esquemaCanto').touched;
    }


    ngOnInit() {
        this.consulta();
    }

    public addItem(item,type): void {
        this.itemSelected = item;
        this.typeSubmit = type;
        if (type === 'editar') {
            this.consultaCatalogoEsquemasCantos();
            this.consultaCatalogoTiemposLiturgicos();
            this.formGroup.controls["titulo"].setValue(String(this.itemSelected.titulo));
            this.formGroup.controls["descripcion"].setValue(String(this.itemSelected.descripcion));
            this.formGroup.controls["tiempoLiturgico"].setValue(String(this.itemSelected.tiemposLiturgiscos._id));
            this.formGroup.controls["esquemaCanto"].setValue(String(this.itemSelected.esquemasCantos._id));

            console.log(this.formGroup);
            
        }
    }

    public cancelTypeSubmit():void{
        this.consultaCatalogoEsquemasCantos();
        this.consultaCatalogoTiemposLiturgicos();
        this.typeSubmit = "";
        this.formGroup.controls["titulo"].setValue("");
        this.formGroup.controls["descripcion"].setValue("");
        this.formGroup.controls["tiempoLiturgico"].setValue("");
        this.formGroup.controls["esquemaCanto"].setValue("");
    }


    private consulta():void {
        this.apiService.consulta()
            .subscribe(data => {
                this.cantos = data.jsonResultado;// ----> jsonResultado No se cambia viene la de interfaz de HttpClientInterface
            });
    }

    private consultaCatalogoEsquemasCantos():void {
        this.apiServiceEsquemaCanto.consulta()
            .subscribe(data => {
                this.esquemasCantos = data.jsonResultado;// ----> jsonResultado No se cambia viene la de interfaz de HttpClientInterface
            });
    }

    private consultaCatalogoTiemposLiturgicos():void {
        this.apiServiceTiemposLiturgicos.consulta()
            .subscribe(data => {
                this.tiempoLiturgicos = data.jsonResultado;// ----> jsonResultado No se cambia viene la de interfaz de HttpClientInterface
            });
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
                    if (data.codE === 0) {
                        this.consulta();
                    }else{
                        alert(data.msgE)
                    }
                },
                error => {
                    this.displayModal = false;
                    console.log(error);
                });
    }

    public gotoDetail(item): void {
        this.route.navigate(['/letra', item._id], { queryParams: { name: item.titulo} });
    }


}
