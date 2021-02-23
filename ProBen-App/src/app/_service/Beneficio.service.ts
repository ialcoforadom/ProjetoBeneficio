import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficio } from '../_models/Beneficio';

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {
  baseUrl = "http://localhost:5000/api/beneficio";
  
  constructor(private http: HttpClient) { }
  getAllBeneficio(): Observable<Beneficio[]>{
    return this.http.get<Beneficio[]>(this.baseUrl);
  }
  
  getBeneficioByNome(nome: string): Observable<Beneficio[]>{
    return this.http.get<Beneficio[]>(`${this.baseUrl}/getByNome/${nome}`);
  }

  getBeneficioById(id: number): Observable<Beneficio> {
    return this.http.get<Beneficio>(`${this.baseUrl}/${id}`);
  }

  postUpload(file: File, name: string) {
    const fileToUpload = <File>file;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
  
  postBeneficio(beneficio: Beneficio) {
    return this.http.post<Beneficio>(this.baseUrl, beneficio);
  }

  putBeneficio(beneficio: Beneficio) {
    return this.http.put(`${this.baseUrl}/${beneficio.id}`, beneficio);
  }

  deleteBeneficio(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
