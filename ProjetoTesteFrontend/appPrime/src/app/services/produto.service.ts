import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../cadastros/model/produto';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  apiURL: string = 'https://localhost:1998/api/produto';

  constructor(private http: HttpClient){
  }

  getAll(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.apiURL);
  }

  deletar(produto: Produto): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${produto.id}`);
  }

  inserir(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(`${this.apiURL}`, produto);
  }

  alterar(produto: Produto): Observable<any>{
    return this.http.put<Produto>( `${this.apiURL}`, produto);
  }

  getById(id: number):Observable<Produto>{
    return  this.http.get<any>( `${this.apiURL}/${id}`);
  }

}
