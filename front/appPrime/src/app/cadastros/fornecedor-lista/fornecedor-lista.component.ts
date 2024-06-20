import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fornecedor } from '../model/fornecedor';
import { FornecedorService } from '../../services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-lista',
  templateUrl: './fornecedor-lista.component.html',
  styleUrls: ['./fornecedor-lista.component.css']
})
export class FornecedorListaComponent implements OnInit {

  fornecedorLista: Fornecedor[] = [];
  fornecedorSelecionado: Fornecedor;
  mensagemSucesso: string = "";
  mensagemErro: string = "";

  constructor( private router: Router, private service: FornecedorService){
    
  }

  ngOnInit(): void {
    this.service.getAll().subscribe( resposta => this.fornecedorLista = resposta);      
  }

  novoCadastro(){
    this.router.navigate(['/fornecedor/form']);
  }

  deletar(){
    this.service.deletar(this.fornecedorSelecionado).subscribe( resposta =>{
      this.mensagemSucesso = "Fornecedor deletado com sucesso!";
      this.ngOnInit();
    },
      erro => this.mensagemErro = "Ocorreu um erro ao deletar este fornecedor "
    )
  }

  adicionaSelecionado( fornecedor: Fornecedor){
    this.fornecedorSelecionado = fornecedor;
  }


}
