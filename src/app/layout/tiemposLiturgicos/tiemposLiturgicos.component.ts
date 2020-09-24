import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TiemposLiturgicosService } from '@app/_services';
import { TiemposLiturgicos, JsonResultado } from '@app/_models';

@Component({
    selector: 'app-tables',
    templateUrl: './tiemposLiturgicos.component.html',
    styleUrls: ['./tiemposLiturgicos.component.scss'],
})
export class TiemposLiturgicosComponent implements OnInit {
    public showDialogAlert: Boolean = false;
    public displayModal: Boolean = false;
    private typeSubmit: String = "";
    private itemSelected: JsonResultado;

    public formGroup: FormGroup;
    public tiempoLiturgicos: TiemposLiturgicos;
    

    constructor(
        private formBuilder: FormBuilder,
        private apiService: TiemposLiturgicosService,
    ) {
        this.formGroup = this.formBuilder.group({
            titulo: ['', Validators.required],
            descripcion: ['', Validators.required],
            urlimagen: ['', Validators.required],
        });
    }

    get tituloNoValido() {
        return this.formGroup.get('titulo').invalid && this.formGroup.get('titulo').touched;
    }

    get descripcionNoValido() {
        return this.formGroup.get('descripcion').invalid && this.formGroup.get('descripcion').touched;
    }

    get urlimagenNoValido() {
        return this.formGroup.get('urlimagen').invalid && this.formGroup.get('urlimagen').touched;
    }

    ngOnInit() {
        this.consulta();
    }

    private consulta():void {
        this.apiService.consulta()
            .subscribe(data => {
                this.tiempoLiturgicos = data.jsonResultado;
            });
    }

    public addItem(item,type): void {
        this.itemSelected = item;
        this.typeSubmit = type;
        if (type === 'editar') {
            this.formGroup.controls["titulo"].setValue(String(this.itemSelected.titulo));
            this.formGroup.controls["descripcion"].setValue(String(this.itemSelected.descripcion));
            this.formGroup.controls["urlimagen"].setValue(String(this.itemSelected.urlimagen));
        }
    }

    public cancelTypeSubmit():void{
        this.itemSelected = {
            descripcion: "",
            status: false,
            titulo: "",
            urlimagen: "",
            _id: "",
        };
        this.typeSubmit = "";
        this.formGroup.controls["titulo"].setValue("");
        this.formGroup.controls["descripcion"].setValue("");
        this.formGroup.controls["urlimagen"].setValue("");
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
