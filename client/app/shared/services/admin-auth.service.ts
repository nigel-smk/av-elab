import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response} from '@angular/http';
import {map, take, tap} from 'rxjs/operators';
import {} from 'rxjs/internal/operators';

@Injectable()
export class AdminAuthService {
  loggedIn = false;
  token = '';

  constructor(private router: Router, private http: Http) {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn = true;
      this.token = token;
    }
  }

  login(username: string, password: string) {
    return this.http.post('/api/admin/auth', {username: username, password: password}).pipe(
      map((response: Response) => response.json().token),
      tap((token: string) => {
        localStorage.setItem('token', token);
        this.loggedIn = true;
        this.token = token;
      }),
      take(1)
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.token = '';
    this.router.navigate(['/admin/login']);
  }

}
