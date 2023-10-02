import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiemposLiturgicosComponent } from './tiemposLiturgicos.component';

const routes: Routes = [
    {
        path: '', component: TiemposLiturgicosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TiemposLiturgicosRoutingModule {
}
