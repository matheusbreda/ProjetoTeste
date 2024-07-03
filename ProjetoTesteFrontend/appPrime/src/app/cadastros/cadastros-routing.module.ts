import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../componentes/layout/layout.component';
import { CidadeListaComponent } from './cidade-lista/cidade-lista.component';
import { CidadeFormComponent } from './cidade-form/cidade-form.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorListaComponent } from './fornecedor-lista/fornecedor-lista.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { TabelaPrecoFormComponent } from './tabela-preco-form/tabela-preco-form.component';
import { TabelaPrecoListaComponent } from './tabela-preco-lista/tabela-preco-lista.component';

const routes: Routes = [
  { path : 'cidade' , component: LayoutComponent, children:[
    { path: 'form', component: CidadeFormComponent},  
    { path: 'form/:id', component: CidadeFormComponent},
    { path: 'lista', component: CidadeListaComponent},
    { path: '', redirectTo: '/cidade/lista', pathMatch: 'full'}
  ]},
  { path : 'cliente' , component: LayoutComponent, children:[
    { path: 'form', component: ClienteFormComponent},
    { path: 'form/:id', component: ClienteFormComponent},
    { path: 'lista', component: ClienteListaComponent},
    { path: '', redirectTo: '/cliente/lista', pathMatch: 'full'}
  ]},

  { path : 'fornecedor' , component: LayoutComponent, children:[
    { path: 'form', component: FornecedorFormComponent},
    { path: 'form/:id', component: FornecedorFormComponent},
    { path: 'lista', component: FornecedorListaComponent},
    { path: '', redirectTo: '/fornecedor/lista', pathMatch: 'full'}
  ]},

  { path : 'produto' , component: LayoutComponent, children:[
    { path: 'form', component: ProdutoFormComponent},
    { path: 'form/:id', component: ProdutoFormComponent},
    { path: 'lista', component: ProdutoListaComponent},
    { path: '', redirectTo: '/produto/lista', pathMatch: 'full'}
  ]},

  { path : 'tabela-preco' , component: LayoutComponent, children:[
    { path: 'form', component: TabelaPrecoFormComponent},
    { path: 'form/:id', component: TabelaPrecoFormComponent},
    { path: 'lista', component: TabelaPrecoListaComponent},
    { path: '', redirectTo: '/tabela-preco/lista', pathMatch: 'full'}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule { }
