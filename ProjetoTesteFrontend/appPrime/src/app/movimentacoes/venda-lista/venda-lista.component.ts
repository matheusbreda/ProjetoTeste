import { Component, OnInit } from '@angular/core';
import { Venda } from '../model/venda';
import { Router } from '@angular/router';
import { VendaService } from '../../services/venda.service';

@Component({
  selector: 'app-venda-lista',
  templateUrl: './venda-lista.component.html',
  styleUrls: ['./venda-lista.component.css']
})
export class VendaListaComponent implements OnInit {

  vendaLista: Venda[] = [];
  vendaSelecionado: Venda;
  mensagemSucesso: string = "";
  mensagemErro: string = "";

  constructor( private router: Router, private service: VendaService){
    
  }

  ngOnInit(): void {
    this.service.getAll().subscribe( resposta => this.vendaLista = resposta);      
  }

  novoCadastro(){
    this.router.navigate(['/venda/form']);
  }

  deletar(){
    this.service.deletar(this.vendaSelecionado).subscribe( resposta =>{
      this.mensagemSucesso = "Venda excluida com sucesso!";
      this.ngOnInit();
    },
      erro => this.mensagemErro = "Ocorreu um erro ao excluir esta venda "
    )
  }

  adicionaSelecionado(venda: Venda){
    this.vendaSelecionado = venda;
  }


}
