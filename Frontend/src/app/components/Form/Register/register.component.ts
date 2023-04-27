import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../CustomValidators/CustomValidator';
import { UsersApiService } from 'src/app/Service/users.service';
import { AuthService } from 'src/app/Service/auth.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../Form.css']
})
export class RegisterComponent implements OnInit {

  title = "Register";
  alert: boolean = false;
  users$: any


  constructor(private userApiService: UsersApiService, private authService: AuthService) { }

  ngOnInit(): void {

  }

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z]+$')]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z]+$')]),
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),

  },
    [CustomValidators.MatchValidator('password', 'confirmPassword')])

  get firstName() {
    return this.registerForm.get('firstName')
  }

  get lastName() {
    return this.registerForm.get('lastName')
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

  submitRegistration() {
    this.userApiService.registerUser(this.registerForm.value)
      .subscribe({
        next: (result) => {
        this.alert = true
        this.registerForm.reset({})
      },
      error: (err) => {
        console.log('register error =>', err) 
        this.registerForm.reset({})  
      }
    })
  }

  closeAlert() {
    this.alert = false
  }
}
