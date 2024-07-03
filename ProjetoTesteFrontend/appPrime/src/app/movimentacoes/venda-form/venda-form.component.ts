import { Component, OnInit } from '@angular/core';
import { Venda } from '../model/venda';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VendaItens } from '../model/venda-itens';
import { ContasReceber } from '../model/contas-receber';
import { ReceberService } from '../../services/receber.service';
import { VendaService } from '../../services/venda.service';
import { ClienteService } from '../../services/cliente.service';
import { ProdutoService } from '../../services/produto.service';
import { TabelaPrecoService } from '../../services/tabela-preco.service';
import { TabelaPreco } from '../../cadastros/model/tabela-preco';
import { Cliente } from '../../cadastros/model/cliente';
import { Produto } from '../../cadastros/model/produto';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {  
  venda: Venda = new Venda();
  success: boolean = false;
  errors: String[] = [];
  id: number = 0;
  clienteLista: Cliente[] = [];
  vendaItemLista: VendaItens[] = [];
  vendaItemSelecionado: VendaItens = new VendaItens();
  produtoLista: Produto[] = [];
  produto: Produto = new Produto();
  valorTotalCalculado: number =0;
  tabelaPrecoLista: TabelaPreco[] = [];
  tabelaPreco: TabelaPreco = new TabelaPreco();
  qtParcela: number;
  valorParcela: number;
  valorTotalParcela: number;
  contasReceberLista: ContasReceber[] = [];
  contasReceber: ContasReceber = new ContasReceber();
  primeiroVencimento: string;


  constructor( 
    private serviceReceber: ReceberService,
    private service: VendaService,  
    private serviceCliente: ClienteService,  
    private serviceProduto: ProdutoService, 
    private serviceTabelaPreco: TabelaPrecoService,
    private router: Router,
    private activatedRoute: ActivatedRoute){
      this.venda = new Venda();
  }

  ngOnInit(): void {

    let params : Observable<Params> = this.activatedRoute.params;
      params.subscribe( urlParams => {
          this.id = urlParams['id'];
          
          if(this.id){
            this.service.getById(this.id).subscribe((response) =>{
              const retorno = JSON.stringify(response);
              const obj = JSON.parse(retorno);
              this.venda   = obj.data;
            });
          }    
          
          
      })
      this.serviceCliente.getAll().subscribe( response => this.clienteLista = response );
      this.serviceProduto.getAll().subscribe( response => this.produtoLista = response );
      this.serviceTabelaPreco.getAll().subscribe( response => this.tabelaPrecoLista = response );
  }

  voltarParaListagem(){
    this.router.navigate(['/venda/lista']);
  }

  onSubmit(){
    this.venda.itens = this.vendaItemLista;

    if(this.id){
      this.service.alterar(this.venda)
          .subscribe(response => {
            this.success = true;
            this.errors = [];
          }, errorResponse => {
            this.errors = ['Erro ao alterar o Venda']
          }
      )
    }else{
      this.service.inserir(this.venda).subscribe( response => {
        this.success = true;
        this.errors = [];

        const retorno = JSON.stringify(response);
        const obj = JSON.parse(retorno);
        this.venda = obj.data;

        this.receberAddVenda(this.venda);

        this.serviceReceber.inserirLista(this.contasReceberLista)
          .subscribe(response => {
            this.success = true;
            this.errors = [];
          }, errorResponse => {
            this.errors = ['Erro ao inserir contas a receber']
          }
      )

      }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
      }
      )
    }
    //this.voltarParaListagem();
  }

  enviaItemExcluir(item: VendaItens){
    this.vendaItemSelecionado = item;

  }

  lancaProduto(){

    this.vendaItemSelecionado.produto = this.produto;
    this.vendaItemLista.push({...this.vendaItemSelecionado});
    this.atualizaTotalVenda();
  }

  atualizaTotalVenda(){
    this.valorTotalCalculado = 0;
    this.vendaItemLista.forEach(element => {
      this.valorTotalCalculado = Number(this.valorTotalCalculado) + Number(element.valorTotal);  
    });
    this.venda.valorTotal = this.valorTotalCalculado;
    this.valorTotalParcela = this.valorTotalCalculado;
  }

  calculaValorProduto(value: any){
    let percentual = this.tabelaPreco.percentual * this.produto.valor;
    let descontoAcrescimo = percentual / 100;
    if(value.tipo === 'Acrescimo'){
      this.vendaItemSelecionado.valorUnitario = this.produto.valor + descontoAcrescimo;
    }else if(value.tipo === 'Desconto'){
      this.vendaItemSelecionado.valorUnitario = this.produto.valor - descontoAcrescimo;
    }
  }

  calcularTotalProduto() {
    this.vendaItemSelecionado.valorTotal = this.vendaItemSelecionado.valorUnitario * this.vendaItemSelecionado.quantidade;
  }

  atualizaParcela() { 
    this.valorParcela = this.valorTotalParcela / this.qtParcela;

  }
        
  lancarParcela() {
    for(let i = 1; i <-- this.qtParcela; i++) {
      this.contasReceber.nrParcela = i;
      this.contasReceber.venda = this.venda;
      this.contasReceber.valorParcela = this.valorParcela;
      this.contasReceber.quantidade = this.qtParcela;
      this.contasReceber.dataVencimneto = this.primeiroVencimento;
      this.contasReceberLista.push({...this.contasReceber});
      this.contasReceber = new  ContasReceber();
    }
  }

  excluirParcelas(){

  }

  receberAddVenda(venda: Venda){
    this.contasReceberLista.forEach(element => {
      element.venda = this.venda;
    });
  }

}
