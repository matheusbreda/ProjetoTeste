import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../cadastros/model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL: string = 'https://localhost:1998/api/cliente';

  constructor(private http: HttpClient){
  }

  getAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.apiURL);
  }

  deletar(cliente: Cliente): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
  }

  inserir(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.apiURL}`, cliente);
  }

  alterar(cliente: Cliente): Observable<any>{
    return this.http.put<Cliente>( `${this.apiURL}`, cliente);
  }

  getById(id: number):Observable<Cliente>{
    return  this.http.get<any>( `${this.apiURL}/${id}`);
  }

}
