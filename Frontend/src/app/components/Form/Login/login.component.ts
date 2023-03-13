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
    username: new FormControl('', [Validators.required,Validators.minLength(4)]),
    password: new FormControl('',[Validators.required, Validators.minLength(4)])
  })

  get username(){
    return this.loginForm.get('username')
  }

  get password(){
    return this.loginForm.get('password')
  }

  submitLogin(){
    if(this.username?.value === 'admin'&& this.password?.value === '1234' && this.loginForm.valid){
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
    
    if (username && password) {
      this.authService.login(username, password)
      this.router.navigate(['/mainpage']);
    }
  }
    this.alert = true;

  if(this.loginForm.invalid){
    this.alert = true;
  } else {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    
    if (username && password) {
      this.usersApiService
        .login(username, password)
        .subscribe((result) => {
          console.log(result)
          this.router.navigate(['/mainpage']);
        });
    } else {
      this.alert = true;
    }
  }
}
  
  closeAlert()
  {
     this.alert = false;
  }

}

