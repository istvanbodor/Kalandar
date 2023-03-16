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

  constructor(private authService: AuthService, private router: Router, private usersApiService: UsersApiService) {}

  ngOnInit(): void {
    
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.minLength(4),Validators.email]),
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
      this.usersApiService
        .login(email, password)
        .subscribe((result) => {
          console.log(result)
          this.router.navigate(['/mainpage']);
        });
    } else{
      this.alert = true;
    }
  }   
  
}
  
  closeAlert()
  {
     this.alert = false;
  }

}

