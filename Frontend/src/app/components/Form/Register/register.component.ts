import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './CustomValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  
  }

  title = "Register";

  registerForm = new FormGroup({
    
    first_name: new FormControl('', [Validators.required,Validators.minLength(5),Validators.pattern('[a-zA-Z]+$')]),
    last_name: new FormControl('', [Validators.required,Validators.minLength(5),Validators.pattern('[a-zA-Z]+$')]),
    username: new FormControl('', [Validators.required,Validators.minLength(5)]),
    password: new FormControl('', [Validators.required,Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required,Validators.minLength(5)]),
    email: new FormControl('', [Validators.required,Validators.email])
  },
  [CustomValidators.MatchValidator('password', 'confirmPassword')]
  )

  registerUser(){
    console.warn(this.registerForm.value)
  }

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
}
