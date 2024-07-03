import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimentacoesRoutingModule } from './movimentacoes-routing.module';
import { FormsModule } from '@angular/forms';
import { VendaListaComponent } from './venda-lista/venda-lista.component';
import { VendaFormComponent } from './venda-form/venda-form.component';


@NgModule({
  declarations: [
    VendaListaComponent,
    VendaFormComponent
  ],
  imports: [
    CommonModule,
    MovimentacoesRoutingModule,
    FormsModule
  ]
})
export class MovimentacoesModule { }
