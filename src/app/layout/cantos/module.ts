import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule}   from '@angular/forms';

import { RoutingModule } from './routing.module';
import { component } from './component';
import { ModalModule } from '../components/modal/animate.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule, 
        RoutingModule
    ],
    declarations: [
        component
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class Module {}
