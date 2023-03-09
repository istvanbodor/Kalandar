import { Component, OnInit   } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../Form.css']
})


export class LoginComponent implements OnInit{

  title: string ="Login";
  alert: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

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
      this.authService.login(this.loginForm.value)
      this.router.navigate(['/mainpage']);
    }
    this.alert = true;
//bemeneti érték username, password //nem jó mert azt érzékeli hogy nem csak string értéket kaphat

    // if(this.loginForm.invalid){
    //   return alert('User dont exists')
      
    // } else{
    //   this.authService
    //   .login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
    //   .subscribe((result) => {
    //     console.log(result)
    //     this.router.navigate(['/mainpage']);
    //   })
    // }


    //data:any értéket kap még nem működik rendesen
    
    // if(this.loginForm.valid){
    //   this.usersApiService.loginUser(this.loginForm.value).subscribe((result) =>{
    //     if(result.success){
    //       console.log(result)
    //       this.router.navigate(['/mainpage']);
    //     } else{
    //       alert(result.message);
    //     }
    //   }
    // )}
  }
  
  closeAlert()
  {
     this.alert = false;
  }

}

