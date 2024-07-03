import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from '../movimentacoes/model/venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  apiURL: string = 'https://localhost:1998/api/venda';

  constructor(private http: HttpClient){
  }

  getAll(): Observable<Venda[]>{
    return this.http.get<Venda[]>(this.apiURL);
  }

  deletar(venda: Venda): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${venda.id}`);
  }

  inserir(venda: Venda): Observable<Venda>{
    return this.http.post<Venda>(`${this.apiURL}`, venda);
  }

  alterar(venda: Venda): Observable<any>{
    return this.http.put<Venda>( `${this.apiURL}`, venda);
  }

  getById(id: number):Observable<Venda>{
    return  this.http.get<any>( `${this.apiURL}/${id}`);
  }

}
