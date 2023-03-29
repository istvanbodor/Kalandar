import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Service/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  user: any
  
  passwordChangeForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })

  get password(){
    return this.passwordChangeForm.get('password')
  }

  get confirmPassword(){
    return this.passwordChangeForm.get('confirmPassword')
  }

  ngOnInit(): void {
   this.authService.getProfile().subscribe({
      next: (result: any[]) => {
        this.user = result;
      },
      error: (error: any[]) => {
        console.error('Error getting user profile:', error);
      }
    });
}

  changePasswordSubmit(){
    return this.authService.changePassword()
  }
}
