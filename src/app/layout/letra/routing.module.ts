import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { component } from './component';

const routes: Routes = [
    {
        path: '', component: component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutingModule {
}
