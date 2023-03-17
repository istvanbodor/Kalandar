import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class UsersApiService{

    url= "http://localhost:8080/"
    
    constructor(private http: HttpClient) {}

    getUsersData(){
        return this.http.get(this.url+`api/user`);
    }
    registerUser(data : any){
        return this.http.post(this.url+`api/auth/register`,data)
    }
    login(email: string,password: string){
        return this.http.post<any>(this.url+`api/auth/authenticate`, { email, password });
    }
    delete(id:number) {
        return this.http.delete(this.url +`users/${id}`);
    }
}