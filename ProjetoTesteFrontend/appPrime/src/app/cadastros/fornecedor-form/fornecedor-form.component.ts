import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FornecedorService } from '../../services/fornecedor.service';
import { CidadeService } from '../../services/cidade.service';
import { Cidade } from '../model/cidade';
import { Fornecedor } from '../model/fornecedor';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css']
})
export class FornecedorFormComponent implements OnInit {

  cidadeLista: Cidade[] = []
  fornecedor: Fornecedor = new Fornecedor();
  success: boolean = false;
  errors: String[] = [];
  id: number = 0;

  constructor( 
    private service: FornecedorService, 
    private serviceCidade: CidadeService,
    private router: Router,
    private activatedRoute: ActivatedRoute){
      this.fornecedor = new Fornecedor();
  }

  ngOnInit(): void {

    let params : Observable<Params> = this.activatedRoute.params;
      params.subscribe( urlParams => {
          this.id = urlParams['id'];

          if(this.id){
            this.service.getById(this.id).subscribe((response) =>{
              const retorno = JSON.stringify(response);
              const obj = JSON.parse(retorno);
              this.fornecedor = obj.data;
            });
          }
          
      })     
      
    this.serviceCidade.getAll().subscribe( response => this.cidadeLista = response );
  }

  voltarParaListagem(){
    this.router.navigate(['/fornecedor/lista']);
  }

  onSubmit(){

    if(this.id){
      this.service.alterar(this.fornecedor)
          .subscribe(response => {
            this.success = true;
            this.errors = [];
          }, errorResponse => {
            this.errors = ['Erro ao alterar o Fornecedor']
          }
      )
    }else{
      this.service.inserir(this.fornecedor).subscribe( response => {
        this.success = true;
        this.errors = [];
        this.fornecedor = response;
      }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
      }
      )
    }
    //this.voltarParaListagem();
  }


}