import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, tap } from "rxjs";
import { UsersApiService } from "./users.service";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = "http://localhost:4200/"

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  expired = false;

  private isTokenExpired(auth_token: string) {
    const expiry = (JSON.parse(atob(auth_token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }

  tokenExpired() {
    if (this.isTokenExpired('token')) {
      return this._router.navigate(['/login'])
    }
    return null
  }

  constructor(private usersApiService: UsersApiService, private _router: Router, private http: HttpClient) {
    const auth_token = localStorage.getItem('token')
    this._isLoggedIn$.next(!!auth_token);
  }

  login(email: string, password: string): Observable<any> {
    return this.usersApiService
      .login(email, password).pipe(
        tap((response: any) => {
          this._isLoggedIn$.next(true)
          localStorage.setItem('token', response.token)
        })
      )
  }
  getUsersData() {
    const auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const requestOptions = { headers: headers };
    return this.http.get(this.url + `api/admin/users`, requestOptions)
  }

  getProfile(): Observable<any>{
    const auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const requestOptions = { headers: headers }
    return this.http.get<any>(this.url + `api/user/profile`, requestOptions)
  }

  changePassword() {
    const auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const requestOptions = { headers: headers };
    return this.http.put(this.url + `api/user/password`, {}, requestOptions)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    this._router.navigate(['/login'])
  }

  registerEvent(data: any) {
    const auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const requestOptions = { headers: headers };
    return this.http.post<any>(this.url + `api/events`, data, requestOptions)
  }

  deleteEvent(id: string) {
    const auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const requestOptions = { headers: headers };
    return this.http.delete(this.url + `api/admin/user/${id}`, requestOptions);
  }

  changeEvent(id: string) {
    const auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const requestOptions = { headers: headers };
    return this.http.put(this.url + `api/admin/role/user/${id}`, {}, requestOptions)
  }

}