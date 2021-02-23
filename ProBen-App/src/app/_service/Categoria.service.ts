import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../_models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  baseUrl = "http://localhost:5000/api/categoria";

  constructor(private http: HttpClient) { }
  getAllCategoria(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.baseUrl);
  }
  
  getCategoriaByNome(nome: string): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.baseUrl}/getByNome/${nome}`);
  }
  
  getCategoriaById(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.baseUrl}${id}`);
  }
  
  postCategoria(categoria: Categoria) {
    return this.http.post<Categoria>(this.baseUrl, categoria);
  }
  putCategoria(categoria: Categoria) {
    return this.http.put(`${this.baseUrl}/${categoria.id}`, categoria);
  }

  deleteCategoria(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
