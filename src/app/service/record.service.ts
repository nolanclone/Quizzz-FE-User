import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



const baseUrl = 'http://localhost:5432/records';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(public http: HttpClient) { }

  createRecord(data): Observable<any> {
    return this.http.post(baseUrl,data);
  }

  getRecordByUser(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getRecordById(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`)
  }
}
