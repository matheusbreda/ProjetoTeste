import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from '../cadastros/model/fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  apiURL: string = 'https://localhost:1998/api/fornecedor';

  constructor(private http: HttpClient){
  }

  getAll(): Observable<Fornecedor[]>{
    return this.http.get<Fornecedor[]>(this.apiURL);
  }

  deletar(fornecedor: Fornecedor): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${fornecedor.id}`);
  }

  inserir(fornecedor: Fornecedor): Observable<Fornecedor>{
    return this.http.post<Fornecedor>(`${this.apiURL}`, fornecedor);
  }

  alterar(fornecedor: Fornecedor): Observable<any>{
    return this.http.put<Fornecedor>( `${this.apiURL}`, fornecedor);
  }

  getById(id: number):Observable<Fornecedor>{
    return  this.http.get<any>( `${this.apiURL}/${id}`);
  }

}
