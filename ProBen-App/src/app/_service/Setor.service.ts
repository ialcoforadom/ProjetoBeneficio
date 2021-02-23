import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Setor } from '../_models/Setor';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  baseUrl = "http://localhost:5000/api/setor";

  constructor(private http: HttpClient) { }
  getAllSetor(): Observable<Setor[]>{
    return this.http.get<Setor[]>(this.baseUrl);
  }
  
  getSetorByNome(nome: string): Observable<Setor[]>{
    return this.http.get<Setor[]>(`${this.baseUrl}/getByNome/${nome}`);
  }
  
  getSetorById(id: number): Observable<Setor>{
    return this.http.get<Setor>(`${this.baseUrl}${id}`);
  }
  
  postSetor(setor: Setor) {
    return this.http.post<Setor>(this.baseUrl, setor);
  }
  putSetor(setor: Setor) {
    return this.http.put(`${this.baseUrl}/${setor.id}`, setor);
  }

  deleteSetor(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
