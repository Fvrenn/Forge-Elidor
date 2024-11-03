import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = 'http://localhost:5000/api/gallery';

  constructor(private http: HttpClient) {}

  getImages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getImagesByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${category}`);
  }

  addImage(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}