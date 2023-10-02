import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule}   from '@angular/forms';

import { EsquemasCantosRoutingModule } from './esquemasCantos-routing.module';
import { EsquemasCantosComponent } from './esquemasCantos.component';
import { ModalModule } from '../components/modal/animate.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule, 
        EsquemasCantosRoutingModule
    ],
    declarations: [
        EsquemasCantosComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EsquemasCantosModule {}
