import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ComponentMode } from '../../objects/component-mode';
import { MultiComponent } from '../../objects/multi-component';

@Component({
  selector: 'app-basic-item-page',
  templateUrl: './basic-item-page.component.html'
})
export class BasicItemPageComponent extends MultiComponent implements OnInit {

  @Input() itemName?: string;
  @Input() itemRoute?: string;
  @Input() listName?: string;
  @Input() listRoute?: string;
  @Input() titleForCreate?: string;
  @Input() titleForRead?: string;
  @Input() titleForUpdate?: string;
  @Input() titleForDelete?: string;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
  ) { super(); }

  ngOnInit() {
    if (history.state.itemName)
      this.title.setTitle('ג\'סטה | ניהול | ' + history.state.itemName);
    else
      this.title.setTitle('ג\'סטה | ניהול | ' + this.titleForCreate);

    this.route.data.subscribe(data => {
      this.mode = <ComponentMode>data["mode"];
      if (this.mode == undefined) throw new Error("The route does not include the \"mode\" data property.");
    });
  }

}
