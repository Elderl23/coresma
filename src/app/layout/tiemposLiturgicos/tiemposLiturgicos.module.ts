import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiemposLiturgicosRoutingModule } from './tiemposLiturgicos-routing.module';
import { TiemposLiturgicosComponent } from './tiemposLiturgicos.component';

@NgModule({
    imports: [CommonModule, TiemposLiturgicosRoutingModule],
    declarations: [TiemposLiturgicosComponent]
})
export class TiemposLiturgicosModule {}
