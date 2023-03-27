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

    // getUsersData(){
    //     return this.http.get(this.url+`api/user`);

    // const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });
        
    //     // const token = this.authService.authToken
    //     // return this.http.get(this.url+`api/user`, {headers: {Authorization: `Bearer ${token}`}});
    // }

    registerUser(data : any){
        return this.http.post(this.url+`api/auth/register`,data)
    }
    login(email: string,password: string){
        return this.http.post<any>(this.url+`api/auth/login`, { email, password });
    }
    delete(id:number) {
        return this.http.delete(this.url +`users/${id}`);
    }
}
