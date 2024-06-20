import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TabelaPreco } from '../cadastros/model/tabela-preco';

@Injectable({
  providedIn: 'root'
})
export class TabelaPrecoService {

  apiURL: string = 'https://localhost:1998/api/tabela-preco';

  constructor(private http: HttpClient){
  }

  getAll(): Observable<TabelaPreco[]>{
    return this.http.get<TabelaPreco[]>(this.apiURL);
  }

  deletar(tabelaPreco: TabelaPreco): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${tabelaPreco.id}`);
  }

  inserir(tabelaPreco: TabelaPreco): Observable<TabelaPreco>{
    return this.http.post<TabelaPreco>(`${this.apiURL}`, tabelaPreco);
  }

  alterar(tabelaPreco: TabelaPreco): Observable<any>{
    return this.http.put<TabelaPreco>( `${this.apiURL}`, tabelaPreco);
  }

  getById(id: number):Observable<TabelaPreco>{
    return  this.http.get<any>( `${this.apiURL}/${id}`);
  }

}
