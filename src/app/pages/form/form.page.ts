import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WsFormComponent } from 'src/app/components/ws-form/ws-form.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  @ViewChild(WsFormComponent) form: WsFormComponent;
  constructor() { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.form.createContactForm()
  }
}
