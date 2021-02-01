import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
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
    private typeSubmit: String = "guardar";
    private itemSelected: JsonResultadoLetras;
    public formGroup: FormGroup;
    public formGroupArray: FormGroup;
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

        this.formGroupArray= this.formBuilder.group({
          canto: ['', Validators.required],
          letras: this.formBuilder.array([this.formBuilder.group({letra: [''],etiqueta:[''],estilo:[''],id:['']})])
      });

    }

    get getLetras(){
      return this.formGroupArray.get('letras') as FormArray;
    }

    public eliminarinput(){
        const control = <FormArray>this.formGroupArray.controls['letras'];

        
        let idDelete = control.value[control.length - 1].id;
        if (idDelete !== null) {
            this.eliminar(idDelete, control);  
        }else{
            control.removeAt(control.length - 1)
        }
      }

    public agregarinput(){
      const control = <FormArray>this.formGroupArray.controls['letras'];
      control.push(this.formBuilder.group({letra:[],etiqueta:['Text/Acorde'],estilo:['item/br'],id:[]}));

      console.log(this.formGroupArray.controls);
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

        this.activatedRoute.queryParams.subscribe(params => {
            this.titulo = params.name;
          });

        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            this.paramsId = id;
            this.formGroupArray.controls["canto"].setValue(this.paramsId);
            this.formGroup.controls["canto"].setValue(this.paramsId);
            this.consulta(id);
      });
    }

    private consulta(id):void {
      let self = this;
        this.apiService.consultaLetra(id)
            .subscribe(data => {
              if (data.jsonResultado.length > 0) {
                this.typeSubmit = "editar";
              }

              const control = <FormArray>self.formGroupArray.controls['letras'];
              control.clear()
            //   self.formGroupArray.reset();//Borrarmos los datos del control

              data.jsonResultado.forEach( function(valor) {
                control.push(self.formBuilder.group({letra:[valor.texto],etiqueta:[valor.etiqueta],estilo:[valor.estilo],id:[valor._id]}));
            });

                this.letras = data.jsonResultado;// ----> jsonResultado No se cambia viene la de interfaz de HttpClientInterface
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

        if (!this.formGroupArray.invalid) {
            if (this.typeSubmit !== "editar") {
              this.formGroupArray.value.letras.shift()
              console.log(this.formGroupArray.value);
              
                this.apiService.guardarLetra(this.formGroupArray.value)
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
              this.formGroupArray.value.letras.shift()
                this.apiService.editarLetra(this.formGroupArray.value,this.formGroupArray.value.canto)
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
        // this.eliminar(this.itemSelected._id)
    }

    public eliminar(id, control): void {
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
