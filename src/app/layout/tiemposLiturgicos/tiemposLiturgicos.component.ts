import { Component, OnInit } from '@angular/core';
import { TiemposLiturgicosService } from '@app/_services';
import { TiemposLiturgicos } from '@app/_models';

@Component({
    selector: 'app-tables',
    templateUrl: './tiemposLiturgicos.component.html',
    styleUrls: ['./tiemposLiturgicos.component.scss'],
})
export class TiemposLiturgicosComponent implements OnInit {
    tiempoLiturgicos: TiemposLiturgicos[] = [];
    constructor(
        private tiemposLiturgicosService: TiemposLiturgicosService,
    ) { }

    ngOnInit() {
        this.tiemposLiturgicosService.consulta()
            .subscribe(data => {
                this.tiempoLiturgicos = data;
                console.log(this.tiempoLiturgicos);
            });
    }

    getTiemposLiturgicosService() {

    }


}
