import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../CustomValidators/CustomValidator';
import { UsersApiService } from 'src/app/Service/users.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../Form.css']
})
export class RegisterComponent implements OnInit {

  title = "Register";
  alert: boolean = false;

  constructor(private usersapiservice:UsersApiService) {}

  ngOnInit(): void {
  
  }

  registerForm = new FormGroup({
    first_name: new FormControl('', [Validators.required,Validators.minLength(4),Validators.pattern('[a-zA-Z]+$')]),
    last_name: new FormControl('', [Validators.required,Validators.minLength(4),Validators.pattern('[a-zA-Z]+$')]),
    username: new FormControl('', [Validators.required,Validators.minLength(4)]),
    password: new FormControl('', [Validators.required,Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required,Validators.minLength(4)]),
    email: new FormControl('', [Validators.required,Validators.email])
  },
  [CustomValidators.MatchValidator('password', 'confirmPassword')]
  )

  get first_name() {
    return this.registerForm.get('first_name')
  }

  get last_name() {
    return this.registerForm.get('last_name')
  }

  get username() {
    return this.registerForm.get('username')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }

  get email() {
    return this.registerForm.get('email')
  }

  userData(){
    console.warn(this.registerForm.value)
    this.alert = true
    this.registerForm.reset({})
    // this.usersapiservice.registerUser(this.registerForm.value).subscribe((result) => {
    //   console.warn("User data",result)
    //   this.alert = true
    //   this.registerForm.reset({})
    // }) 
  }
  closeAlert()
  {
    this.alert = false
  }
}
