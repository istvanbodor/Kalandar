import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { CommunicationService } from 'src/app/Service/communication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  activePath: string = '';
  activeClassName: string = '';

  constructor(public _authService: AuthService, private router: Router, public communicationService: CommunicationService) {}

  isNightMode = false;

  toggleBackground() {
    this.isNightMode = !this.isNightMode;
    this.communicationService.toggleBackground(this.isNightMode);
  } 
}
