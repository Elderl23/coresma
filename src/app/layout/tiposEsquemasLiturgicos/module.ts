import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule}   from '@angular/forms';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { RoutingModule } from './routing.module';
import { component } from './component';
import { DragAndDrop } from './dragAndDrop/component';
import { ModalModule } from '../components/modal/animate.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule, 
        RoutingModule,
        ScrollingModule,
        DragDropModule,
    ],
    declarations: [
        component,
        DragAndDrop
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class Module {}
