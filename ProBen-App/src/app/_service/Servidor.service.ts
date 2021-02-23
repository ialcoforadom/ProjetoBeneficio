import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servidor } from '../_models/Servidor';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {
  baseUrl = "http://localhost:5000/api/servidor";
  
  constructor(private http: HttpClient) { }
  getAllServidor(): Observable<Servidor[]>{
    return this.http.get<Servidor[]>(this.baseUrl);
  }
  
  getServidorByNome(nome: string): Observable<Servidor[]>{
    return this.http.get<Servidor[]>(`${this.baseUrl}/getByNome/${nome}`);
  }
  
  getServidorById(id: number): Observable<Servidor>{
    return this.http.get<Servidor>(`${this.baseUrl}${id}`);
  }
  
  postServidor(servidor: Servidor) {
    return this.http.post<Servidor>(this.baseUrl, servidor);
  }
  putServidor(servidor: Servidor) {
    return this.http.put(`${this.baseUrl}/${servidor.id}`, servidor);
  }

  deleteServidor(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
