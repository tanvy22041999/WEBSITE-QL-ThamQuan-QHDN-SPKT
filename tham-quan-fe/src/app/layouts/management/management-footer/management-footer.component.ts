import { Component } from '@angular/core';

@Component({
  selector: 'app-management-footer',
  templateUrl: './management-footer.component.html',
  styleUrls: ['./management-footer.component.scss']
})
export class ManagementFooterComponent {

  currYear = new Date().getFullYear();

}
