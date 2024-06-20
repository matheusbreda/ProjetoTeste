import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css']
})
export class ProdutoListaComponent implements OnInit {

  produtoLista: Produto[] = [];
  produtoSelecionado: Produto;
  mensagemSucesso: string = "";
  mensagemErro: string = "";

  constructor( private router: Router, private service: ProdutoService){
    
  }

  ngOnInit(): void {
    this.service.getAll().subscribe( resposta => this.produtoLista = resposta);      
  }

  novoCadastro(){
    this.router.navigate(['/produto/form']);
  }

  deletar(){
    this.service.deletar(this.produtoSelecionado).subscribe( resposta =>{
      this.mensagemSucesso = "Produto deletado com sucesso!";
      this.ngOnInit();
    },
      erro => this.mensagemErro = "Ocorreu um erro ao deletar este produto "
    )
  }

  adicionaSelecionado( produto: Produto){
    this.produtoSelecionado = produto;
  }


}
