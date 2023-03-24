import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  public toggleBackgroundEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  public toggleBackground(toggle: boolean) {
      this.toggleBackgroundEventEmitter.emit(toggle);
  }





  
}
