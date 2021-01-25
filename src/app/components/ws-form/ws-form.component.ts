import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from 'src/app/service/local-data.service';


@Component({
  selector: 'app-ws-form',
  templateUrl: './ws-form.component.html',
  styleUrls: ['./ws-form.component.scss'],
})
export class WsFormComponent implements OnInit {

  contactForm: FormGroup;
  url: string;

  constructor(private formBuilder: FormBuilder,
              private localData: LocalDataService) {
  }

  async ngOnInit() {
    await this.createContactForm();
  }

  async createContactForm(){
    this.url = '';
    this.contactForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    let phoneNumber = this.contactForm.get('phoneNumber').value;
    phoneNumber = phoneNumber.replace(/\D/g,'');

    this.url = `${await this.localData.wsApiUrl}${phoneNumber}`;
    this.localData.saveToHistory(phoneNumber);
    console.log(await this.localData.wsApiUrl, phoneNumber, this.url);

    await this.localData.openApp(this.url);
  }
}
