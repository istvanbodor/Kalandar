import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { UsersApiService } from "./users.service";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url= "http://localhost:8080/"

    private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
    isLoggedIn$ = this._isLoggedIn$.asObservable();
    authToken = localStorage.getItem('token');

    constructor(private usersApiService: UsersApiService,private _router: Router) {
        const token = localStorage.getItem('token')
        this._isLoggedIn$.next(!!token);
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

   loggedIn(){
      return !!localStorage.getItem('token')
   }

   logout(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
    }

}