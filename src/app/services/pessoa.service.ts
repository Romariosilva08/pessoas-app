import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pessoa {
  cpf: string;
  nome: string;
  genero: string;
  endereco: string;
  idade: number;
  municipio: string;
  estado: string;
}

export interface PagedResponse<T> {
  items: T[];
  totalRecords: number; 
  totalPages: number;   
  pageNumber: number;
  pageSize: number;
}


@Injectable({
  providedIn: 'root'
})

export class PessoaService {
  private apiUrl = 'http://localhost:5215/api/pessoas';

  constructor(private http: HttpClient) { }

  getPessoas(pageNumber: number, pageSize: number, filtroNome?: string): Observable<PagedResponse<Pessoa>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
  
    if (filtroNome) {
      params = params.set('filtroNome', filtroNome);
    }
  
    return this.http.get<PagedResponse<Pessoa>>(this.apiUrl, { params });
  }
  
}