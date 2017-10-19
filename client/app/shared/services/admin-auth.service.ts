import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Http, Response} from '@angular/http';

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
    return this.http.post('/api/admin/auth', {username: username, password: password})
      .map((response: Response) => response.json().token)
      .do((token) => {
        localStorage.setItem('token', token);
        this.loggedIn = true;
        this.token = token;
      })
      .take(1);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.token = '';
    this.router.navigate(['/admin/login']);
  }

}
