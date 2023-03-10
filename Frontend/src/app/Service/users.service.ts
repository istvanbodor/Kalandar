import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class UsersApiService{

    url= "http://localhost:8080/api/user"
    rooturl= "http://localhost:8080/"
    constructor(private http: HttpClient) {}

    getUsersData(){
        return this.http.get(this.url);
    }
    registerUser(data : any){
        return this.http.post(this.url,data)
    }
    login(username: string,password: string){
        return this.http.post<any>(this.url, { username, password });
    }
}