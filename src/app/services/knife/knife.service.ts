import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KnifeService {
  private apiUrl = 'http://localhost:5000/api/knives'; // Assurez-vous que l'URL correspond à votre backend

  constructor(private http: HttpClient) {}

  getKnives(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addKnife(knife: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, knife);
  }
}
