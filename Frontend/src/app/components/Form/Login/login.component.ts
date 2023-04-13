import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit   } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { UsersApiService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../Form.css']
  
})


export class LoginComponent implements OnInit{

  title: string ="Login";
  alert: boolean = false;
  user: any

  constructor(private authService: AuthService, private router: Router, private usersApiService: UsersApiService) {}

  ngOnInit(): void {

  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(4)])
  })

  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }

  submitLogin(){

  console.warn(this.loginForm.value)

  if(this.loginForm.invalid){
    this.alert = true;
  } else {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (email && password) {
      this.authService
        .login(email, password)
        .subscribe({
          next:(result) => {
            this.authService.getProfile().subscribe((result) =>{
              this.user = result
              localStorage.setItem('userId', this.user.id)
              localStorage.setItem('userRole', this.user.role)
              location.reload()
            })
            // console.log(result)
            this.router.navigate(['/calendar']);
          },
          error:(err : HttpErrorResponse) => {
            this.loginForm.reset({})
            this.alert = true;
            console.log('http login error -> ', err);
          }
        });
    }
  }
}

  closeAlert()
  {
     this.alert = false;
  }



}

