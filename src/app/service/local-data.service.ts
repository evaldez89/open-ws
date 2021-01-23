import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { Log } from '../interfaces/log';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  wsApiUrl: string;
  historyLimit: number;
  phoneLength: number;
  countryPrefix: string;

  constructor() {
    this.loadConfiguration();
  }

  async setValue(key: string, value: any){
    await Storage.set({key, value});
  }

  async getValue(key: string): Promise<{ value: any }> {
    return (await Storage.get({ key }));
  }

  async getCastValue<T>(key: string){
    return (await this.getValue(key)).value as T;
  }

  async loadHistory(): Promise<{ value: Log[] }> {
    const ret = await this.getValue('history');
    return JSON.parse(ret.value);
  }

  async saveToHistory(currentHistory: Log[], newValue: string){
    let newLog: Log;
    newLog.phoneNumber = newValue; // Clean value before asigning
    newLog.date = new Date().toISOString();
    currentHistory.unshift(newLog);
    await this.setValue('history', currentHistory.slice(1, this.historyLimit));
  }

  async loadConfiguration() {
    await this.getValue('wsApiUrl').then(resp => {
      if (resp.value) {
        this.wsApiUrl = resp.value;
      } else {
        this.wsApiUrl = environment.wsApiUrl;
        this.setValue('wsApiUrl', this.wsApiUrl)
      }
    });

    await this.getValue('historyLimit').then(resp => {
      if (resp.value && resp.value <= 20) {
        this.historyLimit = resp.value;
      } else {
        this.historyLimit = environment.historyLimit;
        this.setValue('historyLimit', this.historyLimit);
      }
    });

    await this.getValue('phoneLength').then(resp => {
      if (resp.value) {
        this.phoneLength = resp.value;
      } else {
        this.phoneLength = environment.phoneLength;
        this.setValue('phoneLength', this.phoneLength)
      }
    });

    await this.getValue('countryPrefix').then(resp => {
      if (resp.value) {
        this.countryPrefix = resp.value;
      } else {
        this.countryPrefix = environment.countryPrefix;
        this.setValue('countryPrefix', this.countryPrefix)
      }
    });
  }
}
