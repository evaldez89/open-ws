import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { Log } from '../interfaces/log';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor() {}

  get wsApiUrl(): Promise<string> {
    return (async () => await this.getValue("wsApiUrl"))().then(resp => {
      if (resp.value) {
        return resp.value as string;
      } else {
        this.setValue('wsApiUrl', environment.wsApiUrl)
        return environment.wsApiUrl;
      }
    });
  }

  get historyLimit(): Promise<number> {
    return (async () => await this.getValue("historyLimit"))().then(resp => {
      if (resp.value) {
        return resp.value as number;
      } else {
        this.setValue('historyLimit', environment.historyLimit)
        return environment.historyLimit;
      }
    });
  }

  get phoneLength(): Promise<number> {
    return (async () => await this.getValue("phoneLength"))().then(resp => {
      if (resp.value) {
        return resp.value as number;
      } else {
        this.setValue('phoneLength', environment.phoneLength)
        return environment.phoneLength;
      }
    });
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
    await this.setValue('history', currentHistory.slice(1, await this.historyLimit));
  }
}