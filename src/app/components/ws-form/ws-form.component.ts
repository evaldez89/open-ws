import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { LocalDataService } from 'src/app/service/local-data.service';

const { App } = Plugins;

@Component({
  selector: 'app-ws-form',
  templateUrl: './ws-form.component.html',
  styleUrls: ['./ws-form.component.scss'],
})
export class WsFormComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private localData: LocalDataService) {
  }

  async ngOnInit() {
    await this.createContactForm();
  }

  async createContactForm(){
    this.contactForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    let phoneNumber = this.contactForm.get('phoneNumber').value;
    let url = `${await this.localData.wsApiUrl}${phoneNumber}`;
    this.localData.saveToHistory(phoneNumber);

    // const canOpen = await App.canOpenUrl({ url: url });
    return await App.openUrl({'url': url});
  }
}
