import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent  implements OnInit {

  clienteLista: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string = "";
  mensagemErro: string = "";

  constructor( private router: Router, private service: ClienteService){
    
  }

  ngOnInit(): void {
    this.service.getAll().subscribe( resposta => this.clienteLista = resposta);      
  }

  novoCadastro(){
    this.router.navigate(['/cliente/form']);
  }

  deletar(){
    this.service.deletar(this.clienteSelecionado).subscribe( resposta =>{
      this.mensagemSucesso = "Cliente deletado com sucesso!";
      this.ngOnInit();
    },
      erro => this.mensagemErro = "Ocorreu um erro ao deletar este cliente "
    )
  }

  adicionaSelecionado( cliente: Cliente){
    this.clienteSelecionado = cliente;
  }


}
