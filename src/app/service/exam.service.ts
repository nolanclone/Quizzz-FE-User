import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:5432/exams';

@Injectable({
  providedIn: 'any'
})
export class ExamService {

  constructor(public http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }


  getById(id: number): Observable<any>{
    return this.http.get(`${baseUrl}/${id}`);
  }
}
