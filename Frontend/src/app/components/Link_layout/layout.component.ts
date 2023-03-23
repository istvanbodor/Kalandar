import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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

  isNightMode = false;
  
  toggleBackground(){
    this.isNightMode = !this.isNightMode;
    this.communicationService.toggleBackground(this.isNightMode);
  }

  constructor(public _authService: AuthService,private router: Router, public communicationService: CommunicationService) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activePath = event.url.split('/')[1] || 'default';
        this.activeClassName = this.activePath + 'PageClass';
        console.log(this.activeClassName);
      }
    });
  }
}
