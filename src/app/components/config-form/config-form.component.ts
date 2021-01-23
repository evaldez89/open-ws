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
  phoneLength: number;
  countryPrefix: string;

  constructor(private formBuilder: FormBuilder,
              private localData: LocalDataService) {
  }

  async ngOnInit() {
    await this.createConfigForm();
  }

  async createConfigForm(){
    this.wsApiUrl = await this.localData.getCastValue('wsApiUrl');
    this.historyLimit = await this.localData.getCastValue('historyLimit');
    this.phoneLength = await this.localData.getCastValue('phoneLength');
    this.countryPrefix = await this.localData.getCastValue('countryPrefix');

    this.configForm = this.formBuilder.group({
      wsApiUrl: [this.wsApiUrl],
      historyLimit: [this.historyLimit],
      phoneLength: [this.phoneLength],
      countryPrefix: [this.countryPrefix],
    });
  }

  async onSubmit(data: any) {
    console.log(this.configForm, this.localData.wsApiUrl);
  }

}
