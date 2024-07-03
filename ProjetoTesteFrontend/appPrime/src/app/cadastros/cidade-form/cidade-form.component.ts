import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CidadeService } from '../../services/cidade.service';
import { Cidade } from '../model/cidade';

@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.css']
})
export class CidadeFormComponent  implements OnInit {

  cidade: Cidade = new Cidade();
  success: boolean = false;
  errors: String[] = [];
  id: number = 0;

  constructor( 
    private service: CidadeService, 
    private router: Router,
    private activatedRoute: ActivatedRoute){
      this.cidade = new Cidade();
  }

  ngOnInit(): void {

    let params : Observable<Params> = this.activatedRoute.params;
      params.subscribe( urlParams => {
          this.id = urlParams['id'];
          this.service.getById(this.id)
            .subscribe( response => this.cidade = response, errorResponse => this.cidade = new Cidade() )
      })      
  }

  voltarParaListagem(){
    this.router.navigate(['/cidade/lista']);
  }

  onSubmit(){


    

    if(this.id){
      this.service.alterar(this.cidade)
          .subscribe(response => {
            this.success = true;
            this.errors = [];
          }, errorResponse => {
            this.errors = ['Erro ao alterar o Cidade']
          }
      )
    }else{
      this.service.inserir(this.cidade).subscribe( response => {
        this.success = true;
        this.errors = [];
        this.cidade = response;
      }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
      }
      )
    }
    //this.voltarParaListagem();
  }


}