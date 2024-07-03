import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContasReceber } from '../movimentacoes/model/contas-receber';
import { VendaCidade } from '../relatorios/model/venda-cidade';

@Injectable({
  providedIn: 'root'
})
export class GraficoVendaService {

  apiURL: string = 'https://localhost:1998/api/venda-cidade';

  constructor(private http: HttpClient){
  }

  listar(): Observable<VendaCidade[]>{
    return this.http.get<VendaCidade[]>(this.apiURL);
  }

}