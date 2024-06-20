import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../componentes/layout/layout.component';
import { RelatorioVendaComponent } from './relatorio-venda/relatorio-venda.component';

const routes: Routes = [
  { path : 'relatorio-venda' , component: LayoutComponent, children:[
    { path: 'lista', component: RelatorioVendaComponent},
    { path: '', redirectTo: '/relatorio-venda/lista', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
