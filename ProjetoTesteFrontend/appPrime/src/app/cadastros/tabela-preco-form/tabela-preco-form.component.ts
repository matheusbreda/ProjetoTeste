import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TabelaPreco } from '../model/tabela-preco';
import { TabelaPrecoService } from '../../services/tabela-preco.service';

@Component({
  selector: 'app-tabela-preco-form',
  templateUrl: './tabela-preco-form.component.html',
  styleUrls: ['./tabela-preco-form.component.css']
})
export class TabelaPrecoFormComponent implements OnInit {  
  tabelaPreco: TabelaPreco = new TabelaPreco();
  success: boolean = false;
  errors: String[] = [];
  id: number = 0;

  constructor( 
    private service: TabelaPrecoService,     
    private router: Router,
    private activatedRoute: ActivatedRoute){
      this.tabelaPreco = new TabelaPreco();
  }

  ngOnInit(): void {

    let params : Observable<Params> = this.activatedRoute.params;
      params.subscribe( urlParams => {
          this.id = urlParams['id'];
          if(this.id){
            this.service.getById(this.id).subscribe((response) =>{
              const retorno = JSON.stringify(response);
              const obj = JSON.parse(retorno);
              this.tabelaPreco = obj.data;
            });
          }          
      })
  }

  voltarParaListagem(){
    this.router.navigate(['/tabela-preco/lista']);
  }

  onSubmit(){

    if(this.id){
      this.service.alterar(this.tabelaPreco)
          .subscribe(response => {
            this.success = true;
            this.errors = [];
          }, errorResponse => {
            this.errors = ['Erro ao alterar o Produto']
          }
      )
    }else{
      this.service.inserir(this.tabelaPreco).subscribe( response => {
        this.success = true;
        this.errors = [];
        this.tabelaPreco = response;
      }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
      }
      )
    }
    //this.voltarParaListagem();
  }

}