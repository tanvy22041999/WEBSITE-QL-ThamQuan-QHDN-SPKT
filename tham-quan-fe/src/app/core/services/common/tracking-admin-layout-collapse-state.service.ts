import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackingAdminLayoutCollapseState {

  private collapseState = window.innerWidth < 1200;
  private collapseStateSub = new BehaviorSubject(this.collapseState);

  getState(): Observable<boolean> {
    return this.collapseStateSub.asObservable();
  }

  setState(val: boolean) {
    if (this.collapseState !== val) {
      this.collapseState = val;
      this.collapseStateSub.next(val);
    }
  }
}
