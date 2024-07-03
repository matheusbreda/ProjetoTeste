import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../componentes/layout/layout.component';
import { VendaFormComponent } from './venda-form/venda-form.component';
import { VendaListaComponent } from './venda-lista/venda-lista.component';

const routes: Routes = [
  { path: 'venda', component: LayoutComponent, children:[
    { path: 'form', component: VendaFormComponent},
    { path: 'form/:id', component: VendaFormComponent},
    { path: 'lista', component: VendaListaComponent},
    { path: '', redirectTo: '/venda/lista', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacoesRoutingModule { }
