import { Type } from '@angular/compiler';
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';
import { CustomValidators } from '../CustomValidators/CustomValidator';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any
  users$: any
  users: any
  alert = false


  constructor(private authService: AuthService) {
  }

  passwordChangeForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
  },
    [CustomValidators.MatchValidator('password', 'confirmPassword')])

  get password() {
    return this.passwordChangeForm.get('password')
  }

  get confirmPassword() {
    return this.passwordChangeForm.get('confirmPassword')
  }

  get passwordMatchError() {
    return (
      this.passwordChangeForm.getError('mismatch') &&
      this.passwordChangeForm.get('confirmPassword')?.touched
    )
  }


  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (result: any[]) => {
        this.user = result;
      },
      error: (error: any[]) => {
        console.error('Error getting user profile =>', error);
      }
    });
  }

  changePasswordSubmit() {
    const password = this.passwordChangeForm.get('password')?.value;
    console.log(password)
    if (password) {
      this.authService.changePassword(password)
        .subscribe({
          next: () => {
            this.alert = true
            this.passwordChangeForm.reset({})
          },
          error: (error) => {
            this.passwordChangeForm.reset({})
            console.log('Error! =>', error)
          }
        });
    }

  }

  closeAlert() {
    this.alert = false
  }
}
