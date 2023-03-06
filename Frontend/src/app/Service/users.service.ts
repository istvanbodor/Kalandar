import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
    saveUsersData(data : any){
        console.warn("service",data)
    }
    

}