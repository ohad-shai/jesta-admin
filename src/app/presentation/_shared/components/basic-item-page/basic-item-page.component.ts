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

  title!: string;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) { super(); }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mode = <ComponentMode>data["mode"];
      if (this.mode == undefined) {
        throw new Error("The route does not include the \"mode\" data property.");
      }
      this.initMode();
    });
  }

  private initMode() {
    switch (this.mode) {
      case ComponentMode.Create:
        this.title = this.titleForCreate!;
        break;
      case ComponentMode.Read:
        this.title = (this.titleForRead == undefined ? this.itemName : (this.titleForRead + this.itemName))!;
        break;
      case ComponentMode.Update:
        this.title = (this.titleForUpdate == undefined ? this.itemName : (this.titleForUpdate + this.itemName))!;
        break;
      case ComponentMode.Delete:
        this.title = (this.titleForDelete == undefined ? this.itemName : (this.titleForDelete + this.itemName))!;
        break;
      default:
        throw new Error(`ComponentMode: ${this.mode} is undefined.`);
    }
    this.titleService.setTitle('ג\'סטה | ניהול | ' + this.title);
  }

}
