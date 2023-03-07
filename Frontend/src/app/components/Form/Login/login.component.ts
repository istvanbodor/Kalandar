import { Component, OnInit   } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersApiService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
    
  }

  title: string ="Login";

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.minLength(4)]),
    password: new FormControl('',[Validators.required, Validators.minLength(4)])
  })

  get username(){
    return this.loginForm.get('username')
  }

  get password(){
    return this.loginForm.get('password')
  }


  usernameSubmit : string = "";
  passwordSubmit : string ="";
  show: boolean= false;

  loginUser(){
    console.warn(this.loginForm.value)
  }




}
