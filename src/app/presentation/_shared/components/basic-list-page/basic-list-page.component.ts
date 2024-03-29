import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basic-list-page',
  templateUrl: './basic-list-page.component.html'
})
export class BasicListPageComponent {

  @Input() forRoute?: string;
  @Input() pageTitle?: string;
  @Input() hasCreateButton: boolean = true;

}
