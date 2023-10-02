// Importaciones generales
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- This one
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';


// Component
import { DialogComponent } from './animate.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DialogComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [DialogComponent]
})



export class ModalModule { }
