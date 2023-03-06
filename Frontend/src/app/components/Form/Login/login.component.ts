import { Component, OnInit   } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from 'src/app/Service/service';

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
    username: new FormControl('', [Validators.required,Validators.minLength(5)]),
    password: new FormControl('',[Validators.required, Validators.minLength(5)])
  })
  loginUser(){
    console.warn(this.loginForm.value)
  }

  get username(){
    return this.loginForm.get('username')
  }

  get password(){
    return this.loginForm.get('password')
  }


  usernameSubmit : string = "";
  passwordSubmit : string ="";
  show: boolean= false;

  Submit(){
      if(this.usernameSubmit === "12345" && this.passwordSubmit === "12345")
        return true
      else{
          return false
      }
  }
  clear(){
    this.usernameSubmit = "";
    this.passwordSubmit = "";
    this.show = true
  }


}
