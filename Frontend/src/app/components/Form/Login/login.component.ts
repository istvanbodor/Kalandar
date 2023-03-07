import { Component, OnInit   } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit{

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

  constructor(private authService: AuthService, private router: Router) {}

  submitLogin(){

    this.authService.login(this.loginForm.value)
    this.router.navigate(['/mainpage']);

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
}

