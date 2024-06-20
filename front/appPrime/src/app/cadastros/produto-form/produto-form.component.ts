import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {  
  produto: Produto = new Produto();
  success: boolean = false;
  errors: String[] = [];
  id: number = 0;

  constructor( 
    private service: ProdutoService,     
    private router: Router,
    private activatedRoute: ActivatedRoute){
      this.produto = new Produto();
  }

  ngOnInit(): void {

    let params : Observable<Params> = this.activatedRoute.params;
      params.subscribe( urlParams => {
          this.id = urlParams['id'];
          if(this.id){
            this.service.getById(this.id).subscribe((response) =>{
              const retorno = JSON.stringify(response);
              const obj = JSON.parse(retorno);
              this.produto = obj.data;
            });
          }          
      })
  }

  voltarParaListagem(){
    this.router.navigate(['/produto/lista']);
  }

  onSubmit(){

    if(this.id){
      this.service.alterar(this.produto)
          .subscribe(response => {
            this.success = true;
            this.errors = [];
          }, errorResponse => {
            this.errors = ['Erro ao alterar o Produto']
          }
      )
    }else{
      this.service.inserir(this.produto).subscribe( response => {
        this.success = true;
        this.errors = [];
        this.produto = response;
      }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
      }
      )
    }
    //this.voltarParaListagem();
  }


}