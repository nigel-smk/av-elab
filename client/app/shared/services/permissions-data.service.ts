import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {PermissionData} from '../../models/permission-data';

@Injectable()
export class PermissionsDataService {

  // TODO handle http errors

  constructor(private http: Http) { }

  getAll(): Observable<PermissionData[]> {
    return this.http.get('/api/permissions')
      .map((response: Response) => {
        return response.json() as PermissionData[];
      })
      .take(1);
  }

  create(email: string) {
    return this.http.post('/api/permissions', {email: email}).take(1);
  }

  delete(data: PermissionData) {
    return this.http.delete(`/api/permission/${ data.id }`).take(1);
  }

}
