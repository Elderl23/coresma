import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EsquemasCantosComponent } from './esquemasCantos.component';

const routes: Routes = [
    {
        path: '', component: EsquemasCantosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EsquemasCantosRoutingModule {
}
