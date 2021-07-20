import { Component } from '@angular/core';
import { TrackingAdminLayoutCollapseState } from 'src/app/core/services/common/tracking-admin-layout-collapse-state.service';

@Component({
  selector: 'app-management-layout',
  templateUrl: './management-layout.component.html',
  styleUrls: ['./management-layout.component.scss']
})
export class ManagementLayoutComponent {

  constructor(
    private trackingCollapseStateSvc: TrackingAdminLayoutCollapseState,
  ) { }

  changeCollapseState(state: boolean) {
    this.trackingCollapseStateSvc.setState(state);
  }
}
