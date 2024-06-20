import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabelaPreco } from '../model/tabela-preco';
import { TabelaPrecoService } from '../../services/tabela-preco.service';

@Component({
  selector: 'app-tabela-preco-lista',
  templateUrl: './tabela-preco-lista.component.html',
  styleUrls: ['./tabela-preco-lista.component.css']
})
export class TabelaPrecoListaComponent  implements OnInit {

  tabelaPrecoLista: TabelaPreco[] = [];
  tabelaPrecoSelecionado: TabelaPreco;
  mensagemSucesso: string = "";
  mensagemErro: string = "";

  constructor( private router: Router, private service: TabelaPrecoService){
    
  }

  ngOnInit(): void {
    this.service.getAll().subscribe( resposta => this.tabelaPrecoLista = resposta);      
  }

  novoCadastro(){
    this.router.navigate(['/tabela-preco/form']);
  }

  deletar(){
    this.service.deletar(this.tabelaPrecoSelecionado).subscribe( resposta =>{
      this.mensagemSucesso = "Tabela de Preço deletado com sucesso!";
      this.ngOnInit();
    },
      erro => this.mensagemErro = "Ocorreu um erro ao deletar esta tabela de preço "
    )
  }

  adicionaSelecionado( tabelaPreco: TabelaPreco){
    this.tabelaPrecoSelecionado = tabelaPreco;
  }


}
