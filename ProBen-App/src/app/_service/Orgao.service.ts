import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orgao } from '../_models/Orgao';

@Injectable({
  providedIn: 'root'
})
export class OrgaoService {
  baseUrl = "http://localhost:5000/api/orgao";

  constructor(private http: HttpClient) { }
  getAllOrgao(): Observable<Orgao[]>{
    return this.http.get<Orgao[]>(this.baseUrl);
  }
  
  getOrgaoByNome(nome: string): Observable<Orgao[]>{
    return this.http.get<Orgao[]>(`${this.baseUrl}/getByNome/${nome}`);
  }
  
  getOrgaoById(id: number): Observable<Orgao>{
    return this.http.get<Orgao>(`${this.baseUrl}${id}`);
  }
  
  postOrgao(orgao: Orgao) {
    return this.http.post<Orgao>(this.baseUrl, orgao);
  }
  putOrgao(orgao: Orgao) {
    return this.http.put(`${this.baseUrl}/${orgao.id}`, orgao);
  }

  deleteOrgao(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}