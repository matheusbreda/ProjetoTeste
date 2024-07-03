import { Component, OnInit, Pipe} from '@angular/core';
import { Venda } from '../../movimentacoes/model/venda';
import { Cidade } from '../../cadastros/model/cidade';
import { VendaService } from '../../services/venda.service';
import { CidadeService } from '../../services/cidade.service';


@Component({
  selector: 'app-relatorio-venda',
  templateUrl: './relatorio-venda.component.html',
  styleUrls: ['./relatorio-venda.component.css'],
})

export class RelatorioVendaComponent implements OnInit {
  vendaLista: Venda[] = [];
  cidadeLista: Cidade[] = [];
  cidade: Cidade = new Cidade();
  mensagemSucesso: string = "";
  mensagemErro: string = "";
  filtro: string;
  valorTotalCalculado: number;

  constructor( 
    private serviceVenda: VendaService,
    private serviceCidade: CidadeService
  ){}

  ngOnInit() {
    this.serviceVenda.getAll().subscribe( resposta => this.vendaLista = resposta);  
    this.serviceCidade.getAll().subscribe( resposta => this.cidadeLista = resposta);
  }

  atualizaTotal(){
    this.valorTotalCalculado = 0;
    if(!this.filtro){
      this.vendaLista.forEach(item=> {
        this.valorTotalCalculado = Number(this.valorTotalCalculado) + Number(item.valorTotal);
      }); 
    }else{
      this.vendaLista.filter(item => item.cliente.cidade.nome === this.filtro).forEach(item=> {
        this.valorTotalCalculado = Number(this.valorTotalCalculado) + Number(item.valorTotal);  
      });
    }
  }  

}