import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrosRoutingModule } from './cadastros-routing.module';
import { CidadeListaComponent } from './cidade-lista/cidade-lista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CidadeFormComponent } from './cidade-form/cidade-form.component';
import { ButtonModule } from 'primeng/button';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorListaComponent } from './fornecedor-lista/fornecedor-lista.component';
import { TabelaPrecoFormComponent } from './tabela-preco-form/tabela-preco-form.component';
import { TabelaPrecoListaComponent } from './tabela-preco-lista/tabela-preco-lista.component';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    CidadeListaComponent,
    CidadeFormComponent,
    ClienteFormComponent,
    ClienteListaComponent,
    ProdutoFormComponent,
    ProdutoListaComponent,
    FornecedorFormComponent,
    FornecedorListaComponent,
    TabelaPrecoFormComponent,
    TabelaPrecoListaComponent
  ],
  imports: [
    CommonModule,
    CadastrosRoutingModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule
    
  ]
})
export class CadastrosModule { }
