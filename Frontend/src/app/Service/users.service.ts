import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root',
})

export class UsersApiService{

    url= "http://localhost:4200/"
    
    constructor(private http: HttpClient) {

    }

    registerUser(data : any){
        return this.http.post(this.url+`api/auth/register`,data)
    }
    
    login(email: string,password: string){
        return this.http.post<any>(this.url+`api/auth/login`, { email, password });
    }
}
