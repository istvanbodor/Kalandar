import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { UsersApiService } from "./users.service";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
    isLoggedIn$ = this._isLoggedIn$.asObservable();

    constructor(private usersApiService: UsersApiService) {
        const token = localStorage.getItem('token_auth')
        this._isLoggedIn$.next(!!token);
    }

   login(email: string, password: string): Observable<any>{
    return this.usersApiService
      .login(email, password).pipe(
        tap((response: any) => {
           console.log('token: ',response.token)
           this._isLoggedIn$.next(true)
           localStorage.setItem('token_auth', response.token)
        })
      )
      
   }
}