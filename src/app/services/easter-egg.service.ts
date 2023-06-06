import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EasterEggService {
  constructor() {}

  public konamiTriggered = new BehaviorSubject(false);

  private keyBuffer = [];
  private konami = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  processKeyPress(key) {
    if (key === 'Enter') {
      if (this.keyBuffer.toString() === this.konami.toString()) {
        this.konamiTriggered.next(true);
      }
    } else {
      if (this.keyBuffer.length > 9) {
        this.keyBuffer.shift();
      }
      this.keyBuffer.push(key);
    }
  }
}
