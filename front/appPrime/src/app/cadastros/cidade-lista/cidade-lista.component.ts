import { Component, OnInit } from '@angular/core';
import { CidadeService } from '../../services/cidade.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Cidade } from '../model/cidade';

@Component({
  selector: 'app-cidade-lista',
  templateUrl: './cidade-lista.component.html',
  styleUrl: './cidade-lista.component.css',
  providers: [ConfirmationService]
})
export class CidadeListaComponent implements OnInit {
  cidade: Cidade[];
  cidadeLista: Cidade[] = [];
  cidadeSelecionada: Cidade;
  mensagemSucesso: String = "";
  mensagemErro: String = "";

  constructor(
    private service: CidadeService, private router: Router,
    private confirmaDeletaCidade: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(resposta => this.cidadeLista = resposta);
  }

  novoCadastro() {
    this.router.navigate(["/cidade/form"])
  }

  deletar(event: Event) {
    this.confirmaDeletaCidade.confirm({
      target: event.target as EventTarget,
      message:'',
      header: 'Confirmação de saída',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.service.deletar(this.cidadeSelecionada).subscribe(resposta => {
          this.mensagemSucesso ="Cidade deletada com sucesso!";
          this.ngOnInit();
        })
      },
    }); 
  }

  adicionaSelecionado(cidade: Cidade) {
    this.cidadeSelecionada = cidade;
  }

}
