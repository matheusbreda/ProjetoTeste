import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cidade } from '../model/cidade';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../../services/cliente.service';
import { CidadeService } from '../../services/cidade.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  cidadeLista: Cidade[] = []
  cliente: Cliente = new Cliente();
  success: boolean = false;
  errors: String[] = [];
  id: number = 0;

  constructor( 
    private service: ClienteService, 
    private serviceCidade: CidadeService,
    private router: Router,
    private activatedRoute: ActivatedRoute){
      this.cliente = new Cliente();
  }

  ngOnInit(): void {

    let params : Observable<Params> = this.activatedRoute.params;
      params.subscribe( urlParams => {
          this.id = urlParams['id'];

          if(this.id){
            this.service.getById(this.id).subscribe((response) =>{
              const retorno = JSON.stringify(response);
              const obj = JSON.parse(retorno);
              this.cliente = obj.data;
            });
          }
          
      })     
      
    this.serviceCidade.getAll().subscribe( response => this.cidadeLista = response );
  }

  voltarParaListagem(){
    this.router.navigate(['/cliente/lista']);
  }

  onSubmit(){

    if(this.id){
      this.service.alterar(this.cliente)
          .subscribe(response => {
            this.success = true;
            this.errors = [];
          }, errorResponse => {
            this.errors = ['Erro ao alterar o Cliente']
          }
      )
    }else{
      this.service.inserir(this.cliente).subscribe( response => {
        this.success = true;
        this.errors = [];
        this.cliente = response;
      }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
      }
      )
    }
    //this.voltarParaListagem();
  }


}