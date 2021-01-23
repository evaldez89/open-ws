import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Plugins, AppState } from '@capacitor/core';

const { App } = Plugins;

@Component({
  selector: 'app-ws-form',
  templateUrl: './ws-form.component.html',
  styleUrls: ['./ws-form.component.scss'],
})
export class WsFormComponent implements OnInit {

  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.createContactForm();
  }

  ngOnInit() {}

  createContactForm(){
    this.contactForm = this.formBuilder.group({
      phoneNumber: [''],
    });
  }

  async onSubmit() {
    let url = `whatsapp://api.whatsapp.com/send?phone=${this.contactForm.get('phoneNumber').value}`;
    console.log('1 -------------------');
    const canOpen = await App.canOpenUrl({ url: url });
    return await App.openUrl({'url': url});
    // return await App.openUrl({'url': url}).then(res => {
    //   console.log(res.completed);
    // });

    // let url = `whatsapp:api.whatsapp.com/send?phone=${this.contactForm.get('phoneNumber').value}`;
    // const canOpen = await App.canOpenUrl({ url: url });
    // if(canOpen) {
    //   return await App.openUrl({'url': url});
    // }
  
  }

  onSave() {
    
  }

}
