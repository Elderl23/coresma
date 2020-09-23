import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule}   from '@angular/forms';

import { TiemposLiturgicosRoutingModule } from './tiemposLiturgicos-routing.module';
import { TiemposLiturgicosComponent } from './tiemposLiturgicos.component';
import { ModalModule } from '../../layout/components/modal/animate.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule, 
        TiemposLiturgicosRoutingModule
    ],
    declarations: [
        TiemposLiturgicosComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TiemposLiturgicosModule {}
