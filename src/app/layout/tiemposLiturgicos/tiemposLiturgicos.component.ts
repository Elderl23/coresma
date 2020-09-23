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

    public tLiturgicoForm: FormGroup;
    public tiempoLiturgicos: TiemposLiturgicos;
    

    constructor(
        private formBuilder: FormBuilder,
        private tiemposLiturgicosService: TiemposLiturgicosService,
    ) {
        this.tLiturgicoForm = this.formBuilder.group({
            titulo: ['', Validators.required],
            descripcion: ['', Validators.required],
            urlimagen: ['', Validators.required],
        });
    }

    get tituloNoValido() {
        return this.tLiturgicoForm.get('titulo').invalid && this.tLiturgicoForm.get('titulo').touched;
    }

    get descripcionNoValido() {
        return this.tLiturgicoForm.get('descripcion').invalid && this.tLiturgicoForm.get('descripcion').touched;
    }

    get urlimagenNoValido() {
        return this.tLiturgicoForm.get('urlimagen').invalid && this.tLiturgicoForm.get('urlimagen').touched;
    }

    ngOnInit() {
        this.consulta();
    }

    private consulta():void {
        this.tiemposLiturgicosService.consulta()
            .subscribe(data => {
                this.tiempoLiturgicos = data.jsonResultado;
            });
    }

    public addItem(item,type): void {
        this.itemSelected = item;
        this.typeSubmit = type;
        if (type === 'editar') {
            this.tLiturgicoForm.controls["titulo"].setValue(String(this.itemSelected.titulo));
            this.tLiturgicoForm.controls["descripcion"].setValue(String(this.itemSelected.descripcion));
            this.tLiturgicoForm.controls["urlimagen"].setValue(String(this.itemSelected.urlimagen));
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
        this.tLiturgicoForm.controls["titulo"].setValue("");
        this.tLiturgicoForm.controls["descripcion"].setValue("");
        this.tLiturgicoForm.controls["urlimagen"].setValue("");
    }


    public guardar(): void {
        if (!this.tLiturgicoForm.invalid) {
            if (this.typeSubmit !== "editar") {
                this.tiemposLiturgicosService.guardar(this.tLiturgicoForm.value)
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

                this.tiemposLiturgicosService.editar(this.tLiturgicoForm.value,this.itemSelected._id)
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
            return Object.values(this.tLiturgicoForm.controls).forEach(control => {
                control.markAsTouched();
            }
            )
        }
    }

    public confirmarEliminar(): void {
        this.eliminar(this.itemSelected._id)
    }

    public eliminar(id): void {
        this.tiemposLiturgicosService.eliminar(id)
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
