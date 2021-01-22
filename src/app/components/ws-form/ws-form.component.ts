import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      telNumber: [''],
    });
  }

  onSubmit() {
    console.log('Your form data : ', this.contactForm.value );
  }

  onSave() {
    
  }

}
