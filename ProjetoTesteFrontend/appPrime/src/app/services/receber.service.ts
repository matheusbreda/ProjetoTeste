import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContasReceber } from '../movimentacoes/model/contas-receber';

@Injectable({
  providedIn: 'root'
})
export class ReceberService {

  apiURL: string = 'https://localhost:1998/api/receber/lista';

  constructor(private http: HttpClient){
  }

  inserirLista(receberLista: ContasReceber[]): Observable<ContasReceber[]>{
    return this.http.post<ContasReceber[]>(`${this.apiURL}`, receberLista);
  }

}