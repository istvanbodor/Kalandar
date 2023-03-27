import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, tap } from "rxjs";
import { UsersApiService } from "./users.service";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url= "http://localhost:4200/"

    private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
    isLoggedIn$ = this._isLoggedIn$.asObservable();
    auth_token = localStorage.getItem('token')

    constructor(private usersApiService: UsersApiService,private _router: Router, private http: HttpClient) {
        const auth_token = localStorage.getItem('token')
        this._isLoggedIn$.next(!!auth_token);
    }

   login(email: string, password: string): Observable<any>{
    return this.usersApiService
      .login(email, password).pipe(
        tap((response: any) => {
           console.log('token: ',response.token)
           this._isLoggedIn$.next(true)
           localStorage.setItem('token', response.token)
        })
      )  
   }

  
   getUsersData(){
    const auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      });

    const requestOptions = { headers: headers };
    return this.http.get(this.url+`api/admin/users`, requestOptions);
    }

   loggedIn(){
      return !!localStorage.getItem('token')
    }

   logout(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
    }

    registerEvent(data: any){
      const auth_token = localStorage.getItem('token')
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        });

      const requestOptions = { headers: headers };
      return this.http.post<any>(this.url + `api/events`, data, requestOptions)
    }   

}