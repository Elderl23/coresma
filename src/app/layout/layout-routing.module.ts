import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'tiempos-liturgicos', loadChildren: () => import('./tiemposLiturgicos/tiemposLiturgicos.module').then(m => m.TiemposLiturgicosModule) },
            { path: 'esquemas-cantos', loadChildren: () => import('./esquemasCantos/esquemasCantos.module').then(m => m.EsquemasCantosModule) },
            { path: 'tipos-esquemas-liturgicos', loadChildren: () => import('./tiposEsquemasLiturgicos/module').then(m => m.Module) },
            { path: 'cantos', loadChildren: () => import('./cantos/module').then(m => m.Module) },
            { path: 'cantos/:id', loadChildren: () => import('./cantos/module').then(m => m.Module) },
            { path: 'letra/:id', loadChildren: () => import('./letra/module').then(m => m.Module) },
            { path: 'users', loadChildren: () => import('./users/module').then(m => m.Module) },


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
