import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {StudyData} from '../../models/study-data';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StudyDataService {

  // TODO handle http errors

  constructor(private http: Http) { }

  getAll(): Observable<StudyData[]> {
    return this.http.get('/api/studies')
      .map((response: Response) => {
        return response.json() as StudyData[];
      })
      .take(1);
  }

  create(data: StudyData) {
    return this.http.post('/api/studies', data).take(1);
  }

  delete(data: StudyData) {
    return this.http.delete(`/api/study/${ data._id }`).take(1);
  }

}
