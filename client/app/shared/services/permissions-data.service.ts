import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {PermissionData} from '../../models/permission-data';
import {AdminAuthService} from './admin-auth.service';
import {take, map} from 'rxjs/internal/operators';

@Injectable()
export class PermissionsDataService {

  // TODO handle http errors

  private headers: Headers;

  constructor(private http: Http, private adminAuth: AdminAuthService) {
    this.headers = new Headers();
    this.headers.append('x-access-token', this.adminAuth.token);
  }

  getAll(): Observable<PermissionData[]> {
    return this.http.get('/api/permissions', { headers: this.headers }).pipe(
      map((response: Response) => {
        return response.json() as PermissionData[];
      }),
      take(1)
    );
  }

  create(email: string) {
    return this.http.post('/api/permissions', {email: email}, { headers: this.headers }).pipe(take(1));
  }

  delete(data: PermissionData) {
    return this.http.delete(`/api/permission/${ data.id }`, { headers: this.headers }).pipe(take(1));
  }

}
