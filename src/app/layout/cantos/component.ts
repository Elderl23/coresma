import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from "angular-notifier";


import { CantosService, EsquemasCantosService, TiemposLiturgicosService } from '@app/_services';
import { Cantos, JsonResultadoCantos,EsquemasCantos, JsonResultadoEsquemasCantos, TiemposLiturgicos } from '@app/_models';

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
    private typeSubmit: String = "";
    private itemSelected: JsonResultadoCantos;
    public formGroup: FormGroup;

    public cantos: Cantos;//Variable que se va a iterar en el template
    public esquemasCantosObject: JsonResultadoEsquemasCantos[];//Variable que se va a iterar en el template
    public esquemasCantosObjectv2: JsonResultadoEsquemasCantos[];//Variable que se va a iterar en el template
    public tiempoLiturgicos: TiemposLiturgicos;//Variable que se va a iterar en el template

    public btnRegresar: boolean = false;
    public btnRegresarEC: boolean = false;

    public ligarAEsquema: boolean = false;
    public tutuloLigarAEsquema: String = "";

    // private subscriptions: Subscription[];

    constructor(
        private formBuilder: FormBuilder,
        private apiService: CantosService,
        private apiServiceEsquemaCanto: EsquemasCantosService,
        private apiServiceTiemposLiturgicos: TiemposLiturgicosService,
        private route:Router,
        private store: Store<AppState>,
        notifierService: NotifierService,
        private activatedRoute: ActivatedRoute,
    ) {
        this.formGroup = this.formBuilder.group({
            titulo: ['', Validators.required],
            descripcion: ['', Validators.required],
            tiemposLiturgiscos: ['', Validators.required],
            esquemasCantos: ['', Validators.required],
            tiemposLiturgiscosMany: ['', Validators.required],
            ligadoEsquemaCantos: [false],
        });

        this.notifier = notifierService;
    }

    get tituloNoValido() {
        return this.formGroup.get('titulo').invalid && this.formGroup.get('titulo').touched;
    }

    get descripcionNoValido() {
        return this.formGroup.get('descripcion').invalid && this.formGroup.get('descripcion').touched;
    }

    get tiempoLiturgicoNoValido() {
        return this.formGroup.get('tiemposLiturgiscos').invalid && this.formGroup.get('tiemposLiturgiscos').touched;
    }

    get esquemaCantoNoValido() {
        return this.formGroup.get('esquemasCantos').invalid && this.formGroup.get('esquemasCantos').touched;
    }

    get esquemaCantoManyNoValido() {
        return this.formGroup.get('tiemposLiturgiscosMany').invalid && this.formGroup.get('tiemposLiturgiscosMany').touched;
    }


    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params.id === undefined ) {
                this.consulta();
            } else {
                if (params.id2 === '1') {
                    this.consultaCantosXTiempoLiturgico(params.id);
                    this.btnRegresar = true;
                    this.btnRegresarEC = false;
                } else {
                    this.consultaCantosXEsquemasCantos(params.id);
                    this.btnRegresarEC = true;
                    this.btnRegresar = false;
                }
                
            }
          });
    }

    public addItem(item,type): void {
        this.itemSelected = item;

        console.log(this.itemSelected.ligadoEsquemaCantos);
        

        this.typeSubmit = type;
        if (type === 'editar') {
            this.formGroup.controls["tiemposLiturgiscos"].setValue("");
            this.consultaCatalogoEsquemasCantos();//Consultamos los esquemas entrada, piedad, ....
            this.consultaCatalogoTiemposLiturgicos();

            this.formGroup.controls["titulo"].setValue(String(this.itemSelected.titulo));
            this.formGroup.controls["descripcion"].setValue(String(this.itemSelected.descripcion));
            this.formGroup.controls["esquemasCantos"].setValue(this.itemSelected.esquemasCantos._id);
            this.formGroup.controls['tiemposLiturgiscos'].setValue(this.itemSelected.tiemposLiturgiscos._id);


            const arrayEsquemasCantos = [];


            
            this.itemSelected.tiemposLiturgiscosMany.forEach((element) => {
                arrayEsquemasCantos.push(element._id);
            });


            console.log(arrayEsquemasCantos);

            

            this.formGroup.controls['tiemposLiturgiscosMany'].setValue(arrayEsquemasCantos);

            this.ligarAEsquema = true;
            this.formGroup.controls["ligadoEsquemaCantos"].setValue(this.itemSelected.ligadoEsquemaCantos);

            var that = this;
            setTimeout(function(){

                that.esquemasCantosObjectv2.forEach((element) => {
                    if (that.itemSelected.esquemasCantos.esquemasCantos == element._id) {
                        that.tutuloLigarAEsquema = element.titulo;
                    }
                });
            

              },100);

            
        }
    }

    public cancelTypeSubmit():void{
        this.consultaCatalogoEsquemasCantos();
        this.consultaCatalogoTiemposLiturgicos();
        this.typeSubmit = "";
        this.formGroup.controls["titulo"].setValue("");
        this.formGroup.controls["descripcion"].setValue("");
        this.formGroup.controls["tiemposLiturgiscos"].setValue("");
        this.formGroup.controls["esquemasCantos"].setValue("");
    }


    private consulta():void {
        this.apiService.consulta()
            .subscribe(data => {
                this.cantos = data.jsonResultado.sort(( a, b ) => a < b ? 1 : -1 );// ----> jsonResultado No se cambia viene la de interfaz de HttpClientInterface
                console.log(this.cantos);
                
            });
    }

    private consultaCantosXTiempoLiturgico(idTiempoLiturgico):void{
        this.apiService.consultaIdTiempoLiturgico(idTiempoLiturgico)
            .subscribe(data => {
                this.cantos = data.jsonResultado;// ----> jsonResultado No se cambia viene la de interfaz de HttpClientInterface
                console.log(this.cantos);
            });
        // 
    }

    private consultaCantosXEsquemasCantos(idEsquemasCantos):void{
        this.apiService.consultaIdEsquemasCantos(idEsquemasCantos)
            .subscribe(data => {
                this.cantos = data.jsonResultado;// ----> jsonResultado No se cambia viene la de interfaz de HttpClientInterface
                console.log(this.cantos);
            });
        // 
    }

    private consultaCatalogoEsquemasCantos():void {
        this.apiServiceEsquemaCanto.consulta()
            .subscribe(data => {
                this.esquemasCantosObject = data.jsonResultado;// ----> jsonResultado No se cambia viene la de interfaz de HttpClientInterface
                this.esquemasCantosObjectv2 = data.jsonResultado;
            });
    }

    public onChange(value) {

        let deviceValue = value.split(" ");

        console.log(deviceValue[1]);
        

        let loop = this.esquemasCantosObject;

        this.ligarAEsquema = false;

        for (let i = 0; i < loop.length; i++) {
            if (loop[i].esquemasCantos != "") {
                console.log(loop[i].esquemasCantos);
                
                if (deviceValue[1] == loop[i].esquemasCantos) {
                    this.ligarAEsquema = true;
                    this.tutuloLigarAEsquema = loop[i].titulo;
                }
            }
          }

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
                        this.notifier.notify("success", 'Guardado Correctamente');
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
                        this.notifier.notify("success", 'Actualizado Correctamente');
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
                    }else{ //info, success, warning, error
                        this.notifier.notify("warning", data.msgE);
                    }
                },
                error => {
                    this.displayModal = false;
                    console.log(error);
                });
    }

    public gotoDetail(item): void {
        this.route.navigate(['/letra', item._id], { queryParams: { name: item.titulo, idTiempo:item.tiemposLiturgiscos._id,tiempo:this.btnRegresar, escant:this.btnRegresarEC} });
    }


}
