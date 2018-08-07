import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {StudyData} from '../../models/study-data';
import {Observable} from 'rxjs';
import {AdminAuthService} from './admin-auth.service';
import {take, map} from 'rxjs/internal/operators';

@Injectable()
export class StudyDataService {

  // TODO handle http errors

  private headers: Headers;

  constructor(private http: Http, private adminAuth: AdminAuthService) {
    this.headers = new Headers();
    this.headers.append('x-access-token', this.adminAuth.token);
  }

  getAll(): Observable<StudyData[]> {
    return this.http.get('/api/studies', { headers: this.headers }).pipe(
      map((response: Response) => {
        return response.json() as StudyData[];
      }),
      take(1)
    );
  }

  create(data: StudyData) {
    return this.http.post('/api/studies', data, { headers: this.headers }).pipe(take(1));
  }

  delete(data: StudyData) {
    return this.http.delete(`/api/study/${ data._id }`, { headers: this.headers }).pipe(take(1));
  }

}
