import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, tap } from "rxjs";
import { UsersApiService } from "./users.service";
import axios from "axios";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = "http://localhost:4200/"

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  auth_token = localStorage.getItem('token')

  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    });

  requestOptions = { headers: this.headers };


  user: any
  admin:boolean = true

  constructor(private usersApiService: UsersApiService, private _router: Router, private http: HttpClient) {
    const auth_token = localStorage.getItem('token')
    this._isLoggedIn$.next(!!auth_token);
  }

  userRole(){
    return localStorage.getItem('userRole')
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
    return this.http.get(this.url + `api/admin/users`, this.requestOptions)
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(this.url + `api/user/profile`, this.requestOptions)
  }

   getUserEvents(id: string){
    return this.http.get(this.url + `api/events/user/${id}`, this.requestOptions)
  }

  getAllEvents(){
    return this.http.get(this.url + `api/events`, this.requestOptions)
  }


  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')
    this._router.navigate(['/login'])
  }

  registerEvent(data: any) {
    return this.http.post<any>(this.url + `api/events`, data, this.requestOptions)
  }

  deleteEvent(id: string){
    return this.http.delete(this.url + `api/events/${id}`, this.requestOptions)
  }

  async updateEvent(id : string, body: any){
    const requestOptions = {headers: {authorization: `Bearer ${this.auth_token}`}}
    axios.put(this.url + `api/events/${id}`, body, requestOptions)
  }

  deleteUser(id: string) {
    return this.http.delete(this.url + `api/admin/user/${id}`, this.requestOptions);
  }

  updateRole(id: string, body: any) {
    return this.http.put(this.url + `api/admin/role/user/${id}`, body, this.requestOptions)
  }

  changePassword(password: string) {
    return this.http.put(this.url + `api/user/password`, { password }, this.requestOptions)
  }

}
