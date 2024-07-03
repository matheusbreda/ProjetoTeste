import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioVendaComponent } from './relatorio-venda/relatorio-venda.component';
import { FormsModule } from '@angular/forms';
import { TabelaFiltroPipe } from './relatorio-venda/tabela-filtro.pipe';


@NgModule({
  declarations: [
    RelatorioVendaComponent,
    TabelaFiltroPipe
  ],

  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    FormsModule  
  ]
})
export class RelatoriosModule { }
