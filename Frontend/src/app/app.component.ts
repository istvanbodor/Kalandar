import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommunicationService } from './Service/communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isNightMode = false;

  constructor(public communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.toggleBackgroundEventEmitter.subscribe((toggle) => this.isNightMode = toggle)
  }

  ngOnDestroy(): void {
    this.communicationService.toggleBackgroundEventEmitter.unsubscribe();
  }
}
