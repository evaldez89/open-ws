import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalDataService } from 'src/app/service/local-data.service';

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss'],
})
export class ConfigFormComponent implements OnInit {

  configForm: FormGroup;
  wsApiUrl: string;
  historyLimit: number;

  constructor(private formBuilder: FormBuilder,
              private localData: LocalDataService) {
  }

  async ngOnInit() {
    await this.createConfigForm();
  }

  async createConfigForm(){
    this.wsApiUrl = await this.localData.wsApiUrl;
    this.historyLimit = await this.localData.historyLimit;

    this.configForm = this.formBuilder.group({
      wsApiUrl: [this.wsApiUrl],
      historyLimit: [this.historyLimit]
    });
  }

  async onSubmit() {
    for (let key in this.configForm.controls){
      let formControl = this.configForm.get(key);
      if(formControl.touched){
        this.localData.setValue(key, formControl.value);
      }
    }

    this.configForm.markAsPristine();
  }
}
